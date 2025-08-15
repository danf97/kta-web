import { groq } from "next-sanity";
import { ImageObject, ImageObjectType } from "./imageObject";

export type PropertyCardType = {
  _key: string;
  slug: {
    current: string;
  };
  title: string;
  mainImage: ImageObjectType;
  maxGuests: number | null;
  wc: number | null;
  bedrooms: number | null;
  mainFacilities: {
    featureType: string;
  }[];
  propertyType: string;
  propertyLocation: string;
  fromPrice: number;
  mainDescription: string;
};

export const propertyCardObject = groq`
   _type,
  _key,
  slug,
  title,
  mainImage {
    ${ImageObject}
  },
  maxGuests,
  wc,
  bedrooms,
  mainFacilities[]{
    featureType
  },
  propertyType,
  propertyLocation,
  fromPrice,
  mainDescription
`;
