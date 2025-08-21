import { defineQuery } from "next-sanity";
import { sectionsQuery, sectionsQueryResult } from "../sections";
import { ImageObject, ImageObjectType } from "../objects/imageObject";
import { seoObject, SeoObjectType } from "../objects/seoObject";
import {
  translatableTextObject,
  translatableTextObjectType,
} from "../objects/translatableTextObject";

export type PropertyQueryResult = {
  meta: {
    slug: string;
    lang: string;
  };
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
  childrenWelcome: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  holdParties: boolean;

  // Prices
  basePrice?: number;
  fromPrice?: number;
  valorCaucao?: number;
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
      Monday?: boolean;
      Tuesday?: boolean;
      Wednesday?: boolean;
      Thursday?: boolean;
      Friday?: boolean;
      Saturday?: boolean;
      Sunday?: boolean;
    };
  }[];

  // Facilities
  mainFacilities?: {
    _key: string;
    featureType: string;
    smallTitle?: translatableTextObjectType;
  }[];

  // Images
  mainImage?: ImageObjectType;
  photos?: ImageObjectType[];

  // Check-in/out
  checkinHour?: number;
  checkoutStart?: number;
  checkoutEnd?: number;
};

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
  checkinHour,
  checkoutEnd,
  checkoutStart,
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
  wc
}
`);
