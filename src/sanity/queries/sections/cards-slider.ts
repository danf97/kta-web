import { groq } from "next-sanity";
import { ImageObject, ImageObjectType } from "../objects/imageObject";

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
};

export type cardsSliderSectionQueryResult = {
  title: string;
  layout: "centered" | "aligned-left";
  cards: PropertyCardType[];
};

export const cardsSliderSection = groq`
  _type == "cardsSlider" => {
    title,
    layout,
    cards[]->{
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
      fromPrice
    }
  }
`;
