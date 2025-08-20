import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("[middleware] request");
  let pathname = request.nextUrl.pathname;
  let redirectTo = false;

  const language = request.cookies.get("locale");
  const locales = process.env.NEXT_PUBLIC_LOCALES!.split(",");
  const pathnameCurrentLocale = locales.find((locale: string) => {
    return pathname.includes(`/${locale}/`) || pathname === `/${locale}`;
  });

  console.log("[middleware] locales", locales);

  const lang =
    language?.value.toLowerCase() ||
    process.env.NEXT_PUBLIC_DEFAULT_LOCALE!.toLowerCase();

  if (!pathnameCurrentLocale) {
    return NextResponse.redirect(new URL(`/${lang}/${pathname}`, request.url));
  }

  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.
  if (redirectTo) {
    return NextResponse.redirect(new URL(`/${lang}/${pathname}`, request.url));
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
