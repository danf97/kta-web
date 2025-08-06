import { fontLoader } from "@/utils/fontLoader";

import "../assets/styles/globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontLoaderClasses = fontLoader;

  return (
    <html lang="en">
      <body className={`${fontLoaderClasses}`}>{children}</body>
    </html>
  );
}
