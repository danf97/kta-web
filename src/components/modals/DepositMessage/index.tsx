"use client";

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const DepositMessage = ({
  lang,
  showModal,
  setShowModal,
}: {
  lang: string;
  showModal: boolean;
  setShowModal: (val: boolean) => void;
}) => {
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
              <p className="body-m body-m-bold">
                {lang === "en" ? "Security deposit" : "Caução"}
              </p>

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
              <p className="body-16">
                {lang === "en"
                  ? `A security deposit is required to cover any potential damages,
                    which will be refunded within 7 days after check-out.`
                  : `É exigido um depósito de caução destinado a cobrir eventuais danos, o qual será restituído no prazo máximo de 7 dias após o check-out.`}
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
