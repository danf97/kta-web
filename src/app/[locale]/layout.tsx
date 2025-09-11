import { fontLoader } from "@/utils/fontLoader";
import Header from "@/components/global/Header";
import { getSanitySettings } from "@/sanity/services";
import Footer from "@/components/global/Footer";
import { Providers } from "../providers";

import "../../assets/styles/tailwind-config.css";
import "../../assets/styles/globals.scss";
import CookieBanner from "@/components/global/CookieBanner";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const settings = await getSanitySettings(locale);
  const fontLoaderClasses = fontLoader;

  return (
    <html lang={locale}>
      <body className={`${fontLoaderClasses}`}>
        <Providers locale={locale}>
          <>
            <Header settings={settings} />
            {children}
            <CookieBanner localeData={{ lang: locale }} />
            <Footer settings={settings} />
          </>
        </Providers>
      </body>
    </html>
  );
}
