import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import moment from "moment";

type DayFlags = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  [key: string]: boolean; // Allow string indexing
};

export type RateOutput = {
  _key: string;
  checkInDays: DayFlags;
  checkOutDays: DayFlags;
  minStay: number;
  price: number;
  date: string; // YYYY-MM-DD
};

export const expandRates = (
  data: PropertyQueryResult["pricingTable"]
): RateOutput[] => {
  const result: RateOutput[] = [];

  if (!data) return [];

  data.forEach((item) => {
    const current = new Date(item.startDate);
    const end = new Date(item.endDate);

    while (current <= end) {
      result.push({
        _key: item._key,
        checkInDays: {
          monday: item.checkInDays?.monday ?? false,
          tuesday: item.checkInDays?.tuesday ?? false,
          wednesday: item.checkInDays?.wednesday ?? false,
          thursday: item.checkInDays?.thursday ?? false,
          friday: item.checkInDays?.friday ?? false,
          saturday: item.checkInDays?.saturday ?? false,
          sunday: item.checkInDays?.sunday ?? false,
        },
        checkOutDays: {
          monday: item.checkOutDays?.monday ?? false,
          tuesday: item.checkOutDays?.tuesday ?? false,
          wednesday: item.checkOutDays?.wednesday ?? false,
          thursday: item.checkOutDays?.thursday ?? false,
          friday: item.checkOutDays?.friday ?? false,
          saturday: item.checkOutDays?.saturday ?? false,
          sunday: item.checkOutDays?.sunday ?? false,
        },
        minStay: item.minStay,
        price: item.pricePerNight,
        date: moment(current).format("YYYY-MM-DD"),
      });

      // Move to next day
      current.setDate(current.getDate() + 1);
    }
  });

  return result;
};
