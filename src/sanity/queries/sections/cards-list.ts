import { groq } from "next-sanity";
import {
  propertyCardObject,
  PropertyCardType,
} from "../objects/propertyCardObject";

export type cardsListSectionQueryResult = {
  title: string;
  cards: PropertyCardType[];
};

export const cardsListSection = groq`
  _type == "cardsList" => {
    title,
    cards[]->{
      ${propertyCardObject}
    }
  }
`;
