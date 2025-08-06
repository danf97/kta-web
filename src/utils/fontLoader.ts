import localFont from "next/font/local";

const nexa = localFont({
  src: [
    {
      path: "../assets/fonts/Nexa-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Nexa-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Nexa-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-nexa",
});

// To be loaded on the html tag
export const fontLoader = `${nexa.variable} antialiased`;
