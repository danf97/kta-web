"use client";

import { AppContext } from "@/app/context/AppContext";
import { LanguageIcon } from "@heroicons/react/24/outline";

import React, { useContext } from "react";

const LanguageSelector = ({ className }: { className?: string }) => {
  const { locale, handleLocale } = useContext(AppContext);

  const handleSelectLanguage = (lang: string) => {
    handleLocale(lang);
  };

  return (
    <fieldset className={`flex ${className}`}>
      <label htmlFor="language">
        <span className="sr-only">Select language</span>
        <div className="w-5">
          <LanguageIcon />
        </div>
      </label>
      <select
        name="language"
        id="language"
        className="body-16 pr-1"
        value={locale}
        onChange={(e) => handleSelectLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </fieldset>
  );
};

export default LanguageSelector;
