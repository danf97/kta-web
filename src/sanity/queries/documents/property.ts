import { defineQuery } from "next-sanity";
import { ImageObject, ImageObjectType } from "../objects/imageObject";
import {
  translatableTextObject,
  translatableTextObjectType,
} from "../objects/translatableTextObject";

export type Amenities = {
  pool?: boolean;
  golf?: boolean;
  jacuzzi?: boolean;
  gym?: boolean;
  parking?: boolean;
  wifi?: boolean;
  airConditioning?: boolean;
  tv?: boolean;
  washingMachine?: boolean;
  garden?: boolean;
  beachfront?: boolean;
  seaView?: boolean;
  privatePool?: boolean;
  swimmingPool?: boolean;
  garage?: boolean;
  parkingSpace?: boolean;
  dishwasher?: boolean;
  bbq?: boolean;
  outdoorDining?: boolean;
  outdoorFurniture?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  heater?: boolean;
  fireplace?: boolean;
  elevator?: boolean;
  securitySystem?: boolean;
  smartTv?: boolean;
  coffeeMaker?: boolean;
  microwave?: boolean;
  oven?: boolean;
  fridge?: boolean;
  freezer?: boolean;
  hairDryer?: boolean;
  iron?: boolean;
  clothesDryer?: boolean;
  workspace?: boolean;
  babyEquipment?: boolean;
  bicycles?: boolean;
  beachEquipment?: boolean;
  soundSystem?: boolean;
};

export type RulesType = {
  checkInGreenTime: translatableTextObjectType;
  checkInOrangeTime: translatableTextObjectType;
  checkInRedTime: translatableTextObjectType;
  checkOutTime: translatableTextObjectType;
  childrenWelcome: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  holdParties: boolean;
  otherRules: {
    title: translatableTextObjectType;
    description: translatableTextObjectType;
  }[];
  useDefaultRules: boolean;
  valorCaucao?: number;
  defaultRules: {
    _createdAt: string; // ISO date string
    _id: "propertySettings";
    _rev: string;
    id: "propertySettings";
    rev: string;
    _type: "propertySettings";
    _updatedAt: string; // ISO date string
    checkinHour: number;
    checkoutEnd: number;
    checkoutStart: number;
    childrenWelcome: boolean;
    holdParties: boolean;
    otherRules: {
      title: translatableTextObjectType;
      description: translatableTextObjectType;
    }[];
    petsAllowed: boolean;
    smokingAllowed: boolean;
    // Rules and text
    cancellationGreenText: translatableTextObjectType;
    cancellationOrangeText: translatableTextObjectType;
    cancellationRedText: translatableTextObjectType;
    cancellationSmallText: translatableTextObjectType;
    checkInGreenTime: translatableTextObjectType;
    checkInOrangeTime: translatableTextObjectType;
    checkInOrangeValue: number;
    checkInRedTime: translatableTextObjectType;
    checkInRedValue: number;
    checkInText: translatableTextObjectType;
    checkOutText: translatableTextObjectType;
    checkOutTime: translatableTextObjectType;
    depositText: translatableTextObjectType;
  };
};

export type PropertyQueryResult = {
  meta: {
    slug: string;
    lang: "pt" | "en";
  };
  _key: string;
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _type: "property";
  active: boolean;
  visible: boolean;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };

  // Basic info
  license?: string;
  propertyType: string;
  propertyLocation: string;
  mainDescription: translatableTextObjectType;
  fullDescription: translatableTextObjectType;
  mainFeature?: string;

  // Guests & beds
  maxGuests: number;
  bedrooms: number;
  wc: number;
  doubleBeds: number;
  singleBeds: number;
  sofaBeds: number;

  // Prices
  basePrice?: number;
  fromPrice?: number;
  pricingTable?: {
    _key: string;
    startDate: string;
    endDate: string;
    minStay: number;
    pricePerNight: number;
    checkInDays?: {
      monday?: boolean;
      tuesday?: boolean;
      wednesday?: boolean;
      thursday?: boolean;
      friday?: boolean;
      saturday?: boolean;
      sunday?: boolean;
    };
    checkOutDays?: {
      monday?: boolean;
      tuesday?: boolean;
      wednesday?: boolean;
      thursday?: boolean;
      friday?: boolean;
      saturday?: boolean;
      sunday?: boolean;
    };
  }[];

  // Facilities
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

  // Location
  map: string;
  closeBy?: {
    title: translatableTextObjectType;
    distance: string;
  }[];

  // Images
  mainImage?: ImageObjectType;
  photos?: ImageObjectType[];

  // Check-in/out
  checkinHour?: number;
  checkoutStart?: number;
  checkoutEnd?: number;

  // Rules
} & RulesType;

export const PROPERTY_QUERY = defineQuery(`*[
 _type == "property" && slug.current == $slug
][0]{
   "meta": {
    "slug": slug.current,
    "lang": $lang
  },
  _id,
  _createdAt,
  _updatedAt,
  active,
  basePrice,
  bedrooms,
  childrenWelcome,
  doubleBeds,
  exclusive,
  fromPrice,
  holdParties,
  license,
  mainDescription {
    ${translatableTextObject}
  },
  fullDescription {
    ${translatableTextObject}
  },
  mainFacilities[]{
    _key,
    featureType,
    smallTitle {
      ${translatableTextObject}
    },
  },
  facilities[]{
    ...
  },
  mainFeature,
  mainImage{
    ${ImageObject}
  },
  maxGuests,
  petsAllowed,
  photos[]{
    _key,
    ${ImageObject}
  },
  pricingTable[]{
    _key,
    checkInDays,
    checkOutDays,
    startDate,
    endDate,
    minStay,
    pricePerNight
  },
  propertyLocation,
  propertyType,
  singleBeds,
  slug,
  smokingAllowed,
  sofaBeds,
  title,
  valorCaucao,
  visible,
  wc,
  map,
  closeBy[] {
    ...
  },
  otherRules[] {
    ...
  },
  useDefaultRules,
  "defaultRules": *[_type == "propertySettings"][0],
  checkInGreenTime {
    ${translatableTextObject}
  },
  checkInOrangeTime {
    ${translatableTextObject}
  },
  checkInRedTime {
    ${translatableTextObject}
  },
  checkOutTime {
    ${translatableTextObject}
  }
}
`);
