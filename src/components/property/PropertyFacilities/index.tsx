import { IconAc } from "@/components/icons/IconAc";
import { IconBeachFront } from "@/components/icons/IconBeachFront";
import { IconCoffeeMachine } from "@/components/icons/IconCoffeeMachine";
import { IconGarage } from "@/components/icons/IconGarage";
import { IconGarden } from "@/components/icons/IconGarden";
import { IconGolf } from "@/components/icons/IconGolf";
import { IconJacuzzi } from "@/components/icons/IconJacuzzi";
import { IconParking } from "@/components/icons/IconParking";
import { IconPool } from "@/components/icons/IconPool";
import { IconStreaming } from "@/components/icons/IconStreaming";
import { mainStringsResolver } from "@/libs/mainStrings";
import { Amenities } from "@/sanity/queries/documents/property";
import { translatableTextObjectType } from "@/sanity/queries/objects/translatableTextObject";
import { CheckIcon, WifiIcon } from "@heroicons/react/24/outline";

const facilityIconResolver = (featureType: string) => {
  switch (featureType) {
    case "Swimming pool":
      return <IconPool width={28} height={28} />;
    case "Air conditioning":
      return <IconAc width={28} height={28} />;
    case "Garden":
      return <IconGarden width={28} height={28} />;
    case "Streaming services":
      return <IconStreaming width={28} height={28} />;
    case "Coffee Machine":
      return <IconCoffeeMachine width={28} height={28} />;
    case "Available Parking":
      return <IconParking width={28} height={28} />;
    case "Beachfront":
      return <IconBeachFront width={28} height={28} />;
    case "Free Wifi":
      return <WifiIcon width={28} height={28} />;
    case "Jacuzzi":
      return <IconJacuzzi width={28} height={28} />;
    case "Golf":
      return <IconGolf width={28} height={28} />;
    case "Garage":
      return <IconGarage width={28} height={28} />;
    default:
      return null;
  }
};

const PropertyFacilities = ({
  mainFacilities,
  facilities,
  lang = "en",
}: {
  mainFacilities?: {
    _key: string;
    featureType: string;
    smallTitle?: translatableTextObjectType;
  }[];
  facilities?: {
    _key: string;
    area: string;
    items: {
      _key: string;
    } & Amenities;
  }[];
  lang?: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <h2 className="body-l">{mainStringsResolver("facilities", lang)}</h2>
      </div>

      <div>
        <ul className="grid grid-cols-2 gap-4">
          {mainFacilities?.map((facility) => (
            <li
              key={facility._key}
              className="flex justify-start items-center gap-4 mb-2"
            >
              {facilityIconResolver(facility.featureType)}
              <p className="body-16">
                {mainStringsResolver(facility.featureType, lang)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="grid grid-cols-2 gap-4 mt-10">
          {facilities?.map((facility) => (
            <li key={facility._key} className="flex flex-col gap-4 mb-2">
              <p className="body-16">
                <b>{mainStringsResolver(facility.area, lang)}</b>
              </p>
              <ul>
                {Object.keys(facility.items).map((item, index) => (
                  <li key={index} className="body-16 mb-2">
                    <CheckIcon className="w-4 h-4 inline-block mr-2" />
                    {mainStringsResolver(item, lang)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyFacilities;
