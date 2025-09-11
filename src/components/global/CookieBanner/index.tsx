"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";

import { CookiesContext } from "@/app/context/CookiesContext";
import { Button } from "@/components/ui/Button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Script from "next/script";

const text = {
  default: {
    bannerText: (
      <p>
        We use cookies to improve your experience on our site. Check our{" "}
        <Link href="/policies/privacy-policy" className="underline">
          Privacy Policy
        </Link>{" "}
        for more information.
      </p>
    ),
    bannerCtaManage: "Manage Cookies",
    bannerCtaAcceptAll: "Accept all",
    modalTitle: "Cookie preferences",
    modalSubTitle: "You control your data",
    modalDescription: (
      <>
        Learn more about the cookies we use, and choose which cookies to allow.
        Check our{" "}
        <Link
          href="/policies/privacy-policy"
          className="underline"
          target="_blank"
        >
          Privacy Policy
        </Link>{" "}
        for more information.
      </>
    ),
    modalEssential: "Essential",
    modalEssentialDescription:
      "These cookies are necessary for the website to function and cannot be switched off in our systems.",
    modalPersonalization: "Personalization",
    modalPersonalizationDescription:
      "These cookies store details about your actions to personalize your next visit to the website.",
    modalAnalytics: "Analytics",
    modalAnalyticsDescription:
      "These cookies help us understand how you interact with the site. We use this data to identify areas to improve.",
    modalDeclineAll: "Decline all",
    modalSavePreferences: "Save",
    modalAcceptAll: "Accept all",
  },
  pt_pt: {
    bannerText: (
      <p>
        Utilizamos cookies para melhorar a sua experiência no nosso site.
        Consulte a nossa{" "}
        <Link href="/policies/privacy-policy" className="underline">
          Política de Privacidade
        </Link>{" "}
        para mais informações.
      </p>
    ),
    bannerCtaManage: "Gerir Cookies",
    bannerCtaAcceptAll: "Aceitar todos",
    modalTitle: "Preferências de cookies",
    modalSubTitle: "Você controla seus dados",
    modalDescription: (
      <>
        Saiba mais sobre os cookies que usamos e escolha quais cookies permitir.
        Consulte a nossa{" "}
        <Link
          href="/policies/privacy-policy"
          className="underline"
          target="_blank"
        >
          Política de Privacidade
        </Link>{" "}
        para mais informações.
      </>
    ),
    modalEssential: "Essencial",
    modalEssentialDescription:
      "Esses cookies são necessários para o site funcionar e não podem ser desativados nos nossos sistemas.",
    modalPersonalization: "Personalização",
    modalPersonalizationDescription:
      "Esses cookies armazenam detalhes sobre suas ações para personalizar sua próxima visita ao site.",
    modalAnalytics: "Análises",
    modalAnalyticsDescription:
      "Esses cookies nos ajudam a entender como você interage com o site. Usamos esses dados para identificar áreas a serem melhoradas.",
    modalDeclineAll: "Recusar todos",
    modalSavePreferences: "Salvar preferências",
    modalAcceptAll: "Aceitar todos",
  },
};

export const CookieBanner = ({
  localeData,
}: {
  localeData: { lang: string };
}) => {
  const {
    hasConcent,
    showPreferences,
    setShowPreferences,
    allowPersonalization,
    setAllowPersonalization,
    allowAnalytics,
    setAllowAnalytics,
    handleAcceptAll,
    isChanging,
    handleSavePreferences,
    handleDeclineAll,
  } = useContext(CookiesContext);

  const localeText =
    localeData.lang.toLowerCase() === "pt" ? text.pt_pt : text.default;

  useEffect(() => {
    if (showPreferences) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPreferences]);

  return (
    <>
      <div
        className={`
          fixed left-0 top-0 z-[102] flex h-full w-full items-center justify-center tablet:p-6
          transition-all duration-200 
          ${showPreferences ? "" : "invisible translate-y-[40px] opacity-0"}
        `}
      >
        <div className="h-full w-full tablet:h-auto tablet:max-h-[calc(100vh-48px)] tablet:max-w-[522px] overflow-auto tablet:rounded-3xl border border-primary-main bg-sand-light">
          <div className="sticky top-0 flex flex-col items-center justify-between bg-sand-light p-6 smallDesktop:flex-row">
            <div className="mb-4 flex w-full justify-between smallDesktop:mb-0">
              <p className="body-m body-m-bold">{localeText.modalTitle}</p>

              <button
                onClick={() => {
                  setShowPreferences(false);
                }}
                className="pl-4 hover:opacity-60 cursor-pointer"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-7 px-6 pb-2">
            <div className="mb-3">
              <p className="body-m mb-2">{localeText.modalSubTitle}</p>
              <p className="body-16">{localeText.modalDescription}</p>
            </div>

            <div>
              <button className="body-16 body-16-bold flex cursor-not-allowed items-center gap-2 group">
                <div className="relative flex h-[24px] w-[24px] items-center">
                  <div className=" _border-gray-500 w-full h-full flex justify-center items-center rounded-md bg-orange-light">
                    <CheckIcon className="h-6 w-6" />
                  </div>
                </div>
                <span>{localeText.modalEssential}</span>
              </button>

              <p className="body-16 ml-8">
                {localeText.modalEssentialDescription}
              </p>
            </div>

            <div>
              <button
                className="body-16 body-16-bold flex items-center gap-2 cursor-pointer group"
                onClick={() => {
                  setAllowPersonalization(!allowPersonalization);
                }}
              >
                <div className={`relative flex h-[24px] w-[24px] items-center`}>
                  <div className=" _border-gray-500 w-full h-full flex justify-center items-center rounded-md bg-orange-light group-hover:bg-orange">
                    {allowPersonalization ? (
                      <CheckIcon className="h-6 w-6" />
                    ) : null}
                  </div>
                </div>
                <span>{localeText.modalPersonalization}</span>
              </button>

              <p className="body-16 ml-8">
                {localeText.modalPersonalizationDescription}
              </p>
            </div>

            <div>
              <button
                className="body-16 body-16-bold flex items-center gap-2 cursor-pointer group"
                onClick={() => {
                  setAllowAnalytics(!allowAnalytics);
                }}
              >
                <div className={`relative flex h-[24px] w-[24px] items-center`}>
                  <div className=" _border-gray-500 w-full h-full flex justify-center items-center rounded-md bg-orange-light group-hover:bg-orange">
                    {allowAnalytics ? <CheckIcon className="h-6 w-6" /> : null}
                  </div>
                </div>
                <span>{localeText.modalAnalytics}</span>
              </button>

              <p className="body-16 ml-9">
                {localeText.modalAnalyticsDescription}
              </p>
            </div>
          </div>

          <div className="p-6 flex w-full flex-col gap-2 tablet:flex-row">
            <Button
              label={localeText.modalDeclineAll}
              type="secondary"
              onClick={() => {
                handleDeclineAll();
              }}
              size="small"
              className="flex-1 whitespace-nowrap"
            />
            <Button
              label={localeText.modalAcceptAll}
              type="secondary"
              onClick={() => {
                handleAcceptAll();
              }}
              size="small"
              className="flex-1 whitespace-nowrap"
            />
            <Button
              label={localeText.modalSavePreferences}
              type={isChanging ? "primary" : "secondary"}
              onClick={() => {
                handleSavePreferences();
              }}
              size="small"
              className="flex-1 whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      <div
        onClick={() => setShowPreferences(false)}
        className={`fixed inset-0 z-[101] bg-transparent backdrop-blur-sm  
          transition-opacity duration-300 
          ${showPreferences ? "" : "invisible opacity-0"}`}
      />

      {/* Cookie Banner */}
      <div
        className={`max-w-100 fixed bottom-0 right-0 z-[100] flex w-full justify-end p-[10px] tablet:w-[472px] smallDesktop:justify-end ${
          hasConcent ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex w-full max-w-full flex-col flex-wrap justify-between gap-4 rounded-3xl bg-sand-light p-6 border border-black transition-transform tablet:w-[404px] desktop:w-[1314px] desktop:flex-row desktop:items-center desktop:gap-0">
          <div className="body-16 desktop:w-full desktop:pb-4">
            {localeText.bannerText}
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <Button
              label={localeText.bannerCtaAcceptAll}
              type="primary"
              onClick={() => handleAcceptAll()}
              size="small"
              className="whitespace-nowrap"
            />
            <Button
              label={localeText.bannerCtaManage}
              type="secondary"
              onClick={() => setShowPreferences(true)}
              size="small"
              className="whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-5PZ1VNVNMX`}
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5PZ1VNVNMX');
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });
          `,
        }}
      />
    </>
  );
};

export default CookieBanner;
