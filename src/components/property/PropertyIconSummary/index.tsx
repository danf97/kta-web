import { IconDoubleBed } from "@/components/icons/IconDoubleBed";
import { IconPeople } from "@/components/icons/IconPeople";
import { IconRooms } from "@/components/icons/IconRooms";
import { IconSingleBed } from "@/components/icons/IconSingleBed";
import { IconSofaBed } from "@/components/icons/IconSofaBed";
import { IconWc } from "@/components/icons/IconWc";
import { mainStringsResolver } from "@/libs/mainStrings";

const PropertyIconSummary = ({
  maxGuests,
  wc,
  singleBeds,
  doubleBeds,
  bedrooms,
  sofaBeds,
  lang = "en",
}: {
  maxGuests: number;
  wc: number;
  singleBeds: number;
  doubleBeds: number;
  bedrooms: number;
  sofaBeds: number;
  lang?: string;
}) => {
  const itemsStyles = "flex flex-col justify-end items-center mr-4 p-2 gap-3";

  return (
    <div className="border border-black rounded-3xl p-4 w-full bg-sand-light">
      <ul className="flex flex-wrap flex-end justify-around">
        <li className={itemsStyles}>
          <IconPeople />
          <span>
            {maxGuests} {mainStringsResolver("people", lang)}
          </span>
        </li>
        <li className={itemsStyles}>
          <IconRooms />
          <span>
            {bedrooms} {mainStringsResolver("bedrooms", lang)}
          </span>
        </li>
        <li className={itemsStyles}>
          <IconDoubleBed />
          <span>
            {doubleBeds} {mainStringsResolver("double_beds", lang)}
          </span>
        </li>
        <li className={itemsStyles}>
          <IconSingleBed />
          <span>
            {singleBeds} {mainStringsResolver("single_beds", lang)}
          </span>
        </li>
        {sofaBeds > 0 && (
          <li className={itemsStyles}>
            <IconSofaBed />
            <span>
              {sofaBeds} {mainStringsResolver("sofa_beds", lang)}
            </span>
          </li>
        )}
        <li className={itemsStyles}>
          <IconWc />
          <span>
            {wc} {mainStringsResolver("wc", lang)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PropertyIconSummary;
