"use client";

import React from "react";
import { AppProvider } from "./context/AppContext";
import { CookiesProvider } from "./context/CookiesContext";

type ProvidersProps = {
  locale: string;
  children: React.JSX.Element;
};

export const Providers = ({ locale, children }: ProvidersProps) => {
  return (
    <AppProvider locale={locale}>
      <CookiesProvider>{children}</CookiesProvider>
    </AppProvider>
  );
};
