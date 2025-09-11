"use client";

import { createContext, useState, useEffect, JSX } from "react";
import { getCookie, setCookie } from "cookies-next";
import { usePathname } from "next/navigation";

type CookiesContextTypes = {
  hasConcent: boolean;
  setHasConcent: (arg: boolean) => void | typeof arg;
  showPreferences: boolean;
  setShowPreferences: (arg: boolean) => void | typeof arg;
  allowPersonalization: boolean;
  setAllowPersonalization: (arg: boolean) => void | typeof arg;
  allowAnalytics: boolean;
  setAllowAnalytics: (arg: boolean) => void | typeof arg;
  handleAcceptAll: () => void;
  isChanging: boolean;
  handleDeclineAll: () => void;
  handleSavePreferences: () => void;
  consentData: {
    hasConcent: boolean;
    allowPersonalization: boolean;
    allowAnalytics: boolean;
  };
  scriptsLoaded: boolean;
  setScriptsLoaded: (arg: boolean) => void | typeof arg;
};

export const CookiesContext = createContext<CookiesContextTypes>({
  hasConcent: false,
  setHasConcent: () => {},
  showPreferences: true,
  setShowPreferences: () => {},
  allowPersonalization: true,
  setAllowPersonalization: () => {},
  allowAnalytics: true,
  setAllowAnalytics: () => {},
  handleAcceptAll: () => {},
  isChanging: false,
  handleDeclineAll: () => {},
  handleSavePreferences: () => {},
  consentData: {
    hasConcent: false,
    allowPersonalization: true,
    allowAnalytics: true,
  },
  scriptsLoaded: false,
  setScriptsLoaded: () => {},
});

type CookiesProviderProps = {
  children: JSX.Element;
};

export const CookiesProvider = ({ children }: CookiesProviderProps) => {
  const pathname = usePathname();

  const intialCookieData = {
    hasConcent: false,
    allowPersonalization: true,
    allowAnalytics: true,
  };
  const [hasConcent, setHasConcent] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [allowPersonalization, setAllowPersonalization] = useState(true);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const [consentData, setConsentData] = useState({
    hasConcent: false,
    allowPersonalization: false,
    allowAnalytics: false,
  });
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  console.log("showPreferences", showPreferences);

  // Initial data: check if user has already given consent
  useEffect(() => {
    setTimeout(() => {
      const cookieData = getCookie("c_c_data");
      if (cookieData) {
        const parsedData = JSON.parse(cookieData as string);
        setHasConcent(parsedData.hasConcent);
        setAllowPersonalization(parsedData.allowPersonalization);
        setAllowAnalytics(parsedData.allowAnalytics);
        setConsentData(parsedData);
      } else {
        console.log("No cookie data found");
        setHasConcent(false);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (consentData && typeof window !== "undefined" && "gtag" in window) {
      (window.gtag as any)("consent", "update", {
        ad_user_data: consentData.allowPersonalization ? "granted" : "denied",
        ad_personalization: consentData.allowPersonalization
          ? "granted"
          : "denied",
        ad_storage: consentData.allowAnalytics ? "granted" : "denied",
        analytics_storage: consentData.allowAnalytics ? "granted" : "denied",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consentData]);

  // Changing logic
  useEffect(() => {
    const cookieData = getCookie("c_c_data");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData as string);
      if (
        parsedData.allowPersonalization !== allowPersonalization ||
        parsedData.allowAnalytics !== allowAnalytics
      ) {
        setTimeout(() => {
          setIsChanging(true);
        }, 100);
      }
    } else {
      if (
        intialCookieData.allowPersonalization !== allowPersonalization ||
        intialCookieData.allowAnalytics !== allowAnalytics
      ) {
        setTimeout(() => {
          setIsChanging(true);
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowPersonalization, allowAnalytics]);

  const handleAcceptAll = () => {
    setHasConcent(true);
    setAllowPersonalization(true);
    setAllowAnalytics(true);
    setShowPreferences(false);
    setConsentData({
      hasConcent: true,
      allowPersonalization: true,
      allowAnalytics: true,
    });

    setCookie(
      "c_c_data",
      JSON.stringify({
        hasConcent: true,
        allowPersonalization: true,
        allowAnalytics: true,
      }),
      {
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      }
    );
  };

  const handleDeclineAll = () => {
    setHasConcent(true);
    setAllowPersonalization(false);
    setAllowAnalytics(false);
    setShowPreferences(false);

    setConsentData({
      hasConcent: true,
      allowPersonalization: false,
      allowAnalytics: false,
    });

    setCookie(
      "c_c_data",
      JSON.stringify({
        hasConcent: true,
        allowPersonalization: false,
        allowAnalytics: false,
      }),
      {
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      }
    );
  };

  const handleSavePreferences = () => {
    setHasConcent(true);
    setShowPreferences(false);

    setConsentData({
      hasConcent: true,
      allowPersonalization,
      allowAnalytics,
    });

    setCookie(
      "c_c_data",
      JSON.stringify({
        hasConcent: true,
        allowPersonalization,
        allowAnalytics,
      }),
      {
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      }
    );
  };

  // Cookie Preferences Button
  useEffect(() => {
    const findPreferencesLinks = document.querySelectorAll(
      'a[href*="#cookie-preferences"]'
    );

    // add event listener to each link
    findPreferencesLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        setShowPreferences(true);
      });
    });
  }, [pathname]);

  // Analytics: Scripts loaded and consent given
  useEffect(() => {
    console.log("Scripts loaded:", scriptsLoaded);
    if (scriptsLoaded && consentData) {
      console.log("Setting Google Analytics consent");
      // setGoogleAnalyticsConcent(consentData);
    }
  }, [scriptsLoaded, consentData]);

  return (
    <CookiesContext.Provider
      value={{
        hasConcent,
        setHasConcent,
        showPreferences,
        setShowPreferences,
        allowPersonalization,
        setAllowPersonalization,
        allowAnalytics,
        setAllowAnalytics,
        handleAcceptAll,
        isChanging,
        handleDeclineAll,
        handleSavePreferences,
        consentData,
        scriptsLoaded,
        setScriptsLoaded,
      }}
    >
      {children}
    </CookiesContext.Provider>
  );
};
