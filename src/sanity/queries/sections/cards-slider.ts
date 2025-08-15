import { groq } from "next-sanity";
import {
  propertyCardObject,
  PropertyCardType,
} from "../objects/propertyCardObject";

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
      ${propertyCardObject}
    }
  }
`;
