import { mainStringsResolver } from "@/libs/mainStrings";
import { Amenities, RulesType } from "@/sanity/queries/documents/property";
import { translatableTextObjectType } from "@/sanity/queries/objects/translatableTextObject";
import { multilangFieldResolver } from "@/utils/multilangFieldResolver";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const PropertyImportantDetails = ({
  rules,
  lang = "en",
}: {
  rules: RulesType;
  lang?: string;
}) => {
  console.log({ rules });

  const defaultRules = rules.defaultRules;

  // const activeRules = rules.useDefaultRules ? defaultRules : rules;

  const depositValue = rules.valorCaucao?.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <h2 className="body-l">
          {mainStringsResolver("Important Details", lang)}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-15">
        <div className="">
          <h3 className="body-16-bold mb-4">Check-in</h3>

          <div>
            <ul className="flex bg-white text-white body-xs-bold rounded-3xl border border-black h-7 max-h-7">
              <li className="w-full" />
              <li className="relative w-full bg-accent-green bold ">
                <span className="uppercase pl-1.5">
                  {mainStringsResolver("Free", lang)}
                </span>
                <div className="absolute border-black border-r left-0 -translate-x-1/2 h-2 top-[calc(100%-3px)]" />
                <div className="absolute text-black left-0 -translate-x-1/2 top-[calc(100%+8px)]">
                  {multilangFieldResolver(defaultRules.checkInGreenTime, lang)}
                </div>
              </li>
              <li className="relative w-full bg-accent-orange">
                <span className="uppercase pl-1.5">20€</span>
                <div className="absolute border-black border-r left-0 -translate-x-1/2 h-2 top-[calc(100%-3px)]" />
                <div className="absolute text-black left-0 -translate-x-1/2 top-[calc(100%+8px)]">
                  {multilangFieldResolver(defaultRules.checkInOrangeTime, lang)}
                </div>
              </li>
              <li className="relative w-full bg-accent-red rounded-r-3xl">
                <span className="uppercase pl-1.5">40€</span>
                <div className="absolute border-black border-r left-0 -translate-x-1/2 h-2 top-[calc(100%-3px)]" />
                <div className="absolute text-black left-0 -translate-x-1/2 top-[calc(100%+8px)]">
                  {multilangFieldResolver(defaultRules.checkInRedTime, lang)}
                </div>
              </li>
            </ul>

            <p className="mt-15 body-16">
              {multilangFieldResolver(defaultRules.checkInText, lang)}
            </p>
          </div>
        </div>

        <div>
          <h3 className="body-16-bold mb-4">Check-out</h3>

          <div>
            <ul className="flex bg-white text-white body-xs-bold rounded-3xl border border-black h-7 max-h-7">
              <li className="w-full bg-accent-green rounded-l-3xl" />
              <li className="relative w-full bg-accent-green bold ">&nbsp;</li>

              <li className="relative w-full">
                <div className="absolute border-black border-r left-0 -translate-x-1/2 h-2 top-[calc(100%-3px)]" />
                <div className="absolute text-black left-0 -translate-x-1/2 top-[calc(100%+8px)]">
                  {multilangFieldResolver(defaultRules.checkOutTime, lang)}
                </div>
              </li>
              <li className="relative w-full" />

              <li className="w-full" />
            </ul>

            <p className="mt-15 body-16">
              {multilangFieldResolver(defaultRules.checkOutText, lang)}
            </p>
          </div>
        </div>

        <div>
          <h3 className="body-16-bold mb-4">
            {mainStringsResolver("Cancelation policy", lang)}
          </h3>

          <div>
            <ul className="flex bg-white text-white body-xs-bold rounded-3xl border border-black h-7 max-h-7">
              <li
                className="relative w-full bg-accent-green bold rounded-l-3xl flex items-center gap-1 pl-2 uppercase"
                title="More then 30 days"
              >
                <span className="body-m">{">"}</span>
                30 {mainStringsResolver("Dias", lang)}
              </li>
              <li
                className="relative w-full bg-accent-orange bold flex items-center gap-1 pl-2 uppercase"
                title="From 30 to 15 days"
              >
                <span className="body-m">{"<"}</span>
                30 {mainStringsResolver("Dias", lang)}
              </li>
              <li
                className="relative w-full bg-accent-red bold rounded-r-3xl flex items-center gap-1 pl-2 uppercase"
                title="Less than 15 days"
              >
                <span className="body-m">{"<"}</span>
                15 {mainStringsResolver("Dias", lang)}
              </li>
            </ul>

            <ul className="mt-6 flex flex-col gap-4">
              <li className="ml-6 relative">
                <span className="absolute left-[-6px] -translate-x-full top-[6px] h-3 w-3 rounded-full bg-accent-green" />
                {multilangFieldResolver(
                  defaultRules.cancellationGreenText,
                  lang
                )}
              </li>

              <li className="ml-6 relative">
                <span className="absolute left-[-6px] -translate-x-full top-[6px] h-3 w-3 rounded-full bg-accent-orange" />
                {multilangFieldResolver(
                  defaultRules.cancellationOrangeText,
                  lang
                )}
              </li>

              <li className="ml-6 relative">
                <span className="absolute left-[-6px] -translate-x-full top-[6px] h-3 w-3 rounded-full bg-accent-red" />
                {multilangFieldResolver(defaultRules.cancellationRedText, lang)}
              </li>
            </ul>

            <p className="body-xs mt-4">
              {multilangFieldResolver(defaultRules.cancellationSmallText, lang)}
            </p>
          </div>
        </div>

        {defaultRules.otherRules?.map((rule, index) => (
          <div key={index}>
            <h3 className="body-16-bold mb-4">
              {multilangFieldResolver(rule.title, lang)}
            </h3>

            <ul>
              {multilangFieldResolver(rule.description, lang)
                ?.split("\n")
                .map((line, idx, arr) => (
                  <li key={idx} className="pl-4 relative mb-2">
                    <span className="absolute left-0 top-0">→</span>
                    {line}
                    {idx < arr.length - 1 && <br />}
                  </li>
                ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="body-16-bold mb-4">
            {mainStringsResolver("General rules", lang)}
          </h3>

          <ul className="flex flex-col gap-2">
            <li>
              {defaultRules.childrenWelcome ? (
                <div className="flex items-center gap-1">
                  <span>
                    <CheckIcon className="w-5" />
                  </span>
                  <span>
                    {mainStringsResolver("Children are welcome", lang)}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>
                    <XMarkIcon className="w-5" />
                  </span>
                  <span>
                    {mainStringsResolver("Children are not welcome", lang)}
                  </span>
                </div>
              )}
            </li>
            <li>
              {defaultRules.smokingAllowed ? (
                <div className="flex items-center gap-1">
                  <span>
                    <CheckIcon className="w-5" />
                  </span>
                  <span>{mainStringsResolver("Smoking allowed", lang)}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>
                    <XMarkIcon className="w-5" />
                  </span>
                  <span>{mainStringsResolver("No smoking", lang)}</span>
                </div>
              )}
            </li>
            <li>
              {defaultRules.petsAllowed ? (
                <div className="flex items-center gap-1">
                  <span>
                    <CheckIcon className="w-5" />
                  </span>
                  <span>{mainStringsResolver("Pets allowed", lang)}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>
                    <XMarkIcon className="w-5" />
                  </span>
                  <span>{mainStringsResolver("No pets", lang)}</span>
                </div>
              )}
            </li>
            <li>
              {defaultRules.holdParties ? (
                <div className="flex items-center gap-1">
                  <span>
                    <CheckIcon className="w-5" />
                  </span>
                  <span>
                    {mainStringsResolver("Parties or events allowed", lang)}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>
                    <XMarkIcon className="w-5" />
                  </span>
                  <span>
                    {mainStringsResolver("No parties or events", lang)}
                  </span>
                </div>
              )}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="body-16-bold mb-4">
            {mainStringsResolver("Deposit", lang)}
          </h3>

          <p>
            {multilangFieldResolver(defaultRules.depositText, lang)?.replace(
              "{deposit_value}",
              depositValue || "N/A"
            )}
          </p>
        </div>

        {rules.otherRules?.map((rule, index) => (
          <div key={index}>
            <h3 className="body-16-bold mb-4">
              {multilangFieldResolver(rule.title, lang)}
            </h3>

            <ul>
              {multilangFieldResolver(rule.description, lang)
                ?.split("\n")
                .map((line, idx, arr) => (
                  <li key={idx} className="pl-4 relative mb-2">
                    <span className="absolute left-0 top-0">→</span>
                    {line}
                    {idx < arr.length - 1 && <br />}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyImportantDetails;
