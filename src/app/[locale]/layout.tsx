import { fontLoader } from "@/utils/fontLoader";
import Header from "@/components/global/Header";
import { getSanitySettings } from "@/sanity/services";

import "../../assets/styles/tailwind-config.css";
import "../../assets/styles/globals.scss";
import Footer from "@/components/global/Footer";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  console.log("layout", { locale });
  const fontLoaderClasses = fontLoader;
  const settings = await getSanitySettings(locale);

  console.log("layout", { settings });

  return (
    <html lang="en">
      <body className={`${fontLoaderClasses}`}>
        <Header settings={settings} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  );
}
