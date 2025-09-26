"use client";

import React, { useEffect } from "react";
import { createContext, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export type AppContextTypes = {
  isHome: boolean;
  setIsHome: (isHome: boolean) => void;
  colorMode: "light" | "dark";
  setColorMode: (mode: "light" | "dark") => void;
  handleLocale: (newLocale: string) => void;
  locale: string;
  availableLocales: string[];
  pageLoading: boolean;
  setPageLoading: (isLoading: boolean) => void;
  loadAnalytics: boolean;
  setLoadAnalytics: (load: boolean) => void;
};

export const AppContext = createContext<AppContextTypes>({
  isHome: false,
  setIsHome: () => {},
  colorMode: "light",
  setColorMode: () => {},
  handleLocale: () => {},
  locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE!,
  availableLocales: [],
  pageLoading: false,
  setPageLoading: () => {},
  loadAnalytics: false,
  setLoadAnalytics: () => {},
});

type AppProviderProps = {
  children: React.JSX.Element;
  locale: string;
};

export const AppProvider = ({ children, locale }: AppProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  /*
   *   Set Color Mode
   */

  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  /*
   *   Locale Handler
   */

  useEffect(() => {
    setCookie("locale", locale);
  }, [locale]);

  const availableLocales = process.env.NEXT_PUBLIC_LOCALES!.split(",");

  const handleLocale = (newLocale: string) => {
    setCookie("locale", newLocale);
    const newPath = pathname.replace(locale, newLocale);
    const searhTerms = window.location.search;
    console.log("searhTerms", searhTerms);
    const newUrl = searhTerms ? newPath + searhTerms : newPath;
    console.log("newUrl", newUrl);
    router.push(newUrl);
  };

  /*
   *   Page Bar Loader & ShowCase Cookie Handler
   */

  const [pageLoading, setPageLoading] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setPageLoading(false);

    if (pathname === `/${locale}`) {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [pathname, locale]);

  /*
   *   Load Analytics
   */

  const [loadAnalytics, setLoadAnalytics] = useState(false);

  return (
    <AppContext.Provider
      value={{
        // Home
        isHome,
        setIsHome,
        // Color Mode
        colorMode,
        setColorMode,
        // Locale
        handleLocale,
        locale,
        availableLocales,
        // Page Bar Loader
        pageLoading,
        setPageLoading,
        // Load Analytics
        loadAnalytics,
        setLoadAnalytics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
