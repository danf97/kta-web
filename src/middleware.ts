import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const { pathname, searchParams } = request.nextUrl;
  const redirectTo = false;

  const locale = cookieStore.get("locale");
  const locales = process.env.NEXT_PUBLIC_LOCALES!.split(",");
  const pathnameCurrentLocale = locales.find((locale: string) => {
    return pathname.includes(`/${locale}/`) || pathname === `/${locale}`;
  });

  const lang = pathnameCurrentLocale
    ? pathnameCurrentLocale
    : locale?.value.toLowerCase() ||
      process.env.NEXT_PUBLIC_DEFAULT_LOCALE!.toLowerCase();

  const searchParamsString =
    searchParams.size > 0 ? "?" + searchParams.toString() : "";

  if (!pathnameCurrentLocale) {
    return NextResponse.redirect(
      new URL(`/${lang}/${pathname}${searchParamsString}`, request.url)
    );
  }

  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.
  if (redirectTo) {
    return NextResponse.redirect(
      new URL(`/${lang}/${pathname}${searchParamsString}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - metafields
     * - images
     */
    "/((?!api|_next/static|_next/image|images|metafields|sitemap|sitemap.xml|robots|favicon|fonts).*)",
  ],
};
