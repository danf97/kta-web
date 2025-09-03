import { fontLoader } from "@/utils/fontLoader";
import Header from "@/components/global/Header";
import { getSanitySettings } from "@/sanity/services";

import "../../assets/styles/tailwind-config.css";
import "../../assets/styles/globals.scss";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontLoaderClasses = fontLoader;
  const settings = await getSanitySettings();

  console.log({ settings });

  return (
    <html lang="en">
      <body className={`${fontLoaderClasses}`}>
        <Header settings={settings} />
        {children}
      </body>
    </html>
  );
}
