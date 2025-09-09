import { mainStringsResolver } from "@/libs/mainStrings";
import { Amenities, RulesType } from "@/sanity/queries/documents/property";
import { translatableTextObjectType } from "@/sanity/queries/objects/translatableTextObject";
import { multilangFieldResolver } from "@/utils/multilangFieldResolver";

const PropertyImportantDetails = ({
  rules,
  lang = "en",
}: {
  rules: RulesType;
  lang?: string;
}) => {
  console.log({ rules });

  const defaultRules = rules.defaultRules;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <h2 className="body-l">
          {mainStringsResolver("Important Details", lang)}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div>
          <h3 className="body-16-bold mb-4">Check-in</h3>

          <div>
            <ul className="flex bg-white text-white body-xs-bold rounded-3xl border border-black">
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
            <ul className="flex bg-white text-white body-xs-bold rounded-3xl border border-black">
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
      </div>
    </div>
  );
};

export default PropertyImportantDetails;
