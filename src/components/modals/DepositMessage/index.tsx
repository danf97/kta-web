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
          href="https://drive.google.com/file/d/1y0XDf_45njS5kuQIqGvmU_5n5vhBfaw_/view"
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
          href="https://drive.google.com/file/d/1y0XDf_45njS5kuQIqGvmU_5n5vhBfaw_/view"
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

// To finish
export const DepositMessage = ({
  localeData,
  setShowModal,
}: {
  localeData: { lang: string };
  setShowModal: (val: boolean) => void;
}) => {
  const showModal = true;

  const localeText =
    localeData.lang.toLowerCase() === "pt" ? text.pt_pt : text.default;

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <>
      <div
        className={`
          fixed left-0 top-0 z-[102] flex h-full w-full items-center justify-center tablet:p-6
          transition-all duration-200 
          ${showModal ? "" : "invisible translate-y-[40px] opacity-0"}
        `}
      >
        <div className="h-full w-full tablet:h-auto tablet:max-h-[calc(100vh-48px)] tablet:max-w-[522px] overflow-auto tablet:rounded-3xl border border-primary-main bg-sand-light">
          <div className="sticky top-0 flex flex-col items-center justify-between bg-sand-light p-6 smallDesktop:flex-row">
            <div className="mb-4 flex w-full justify-between smallDesktop:mb-0">
              <p className="body-m body-m-bold">{localeText.modalTitle}</p>

              <button
                onClick={() => {
                  setShowModal(false);
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
          </div>
        </div>
      </div>

      <div
        onClick={() => setShowModal(false)}
        className={`fixed inset-0 z-[101] bg-transparent backdrop-blur-sm  
          transition-opacity duration-300 
          ${showModal ? "" : "invisible opacity-0"}`}
      />
    </>
  );
};

export default DepositMessage;
