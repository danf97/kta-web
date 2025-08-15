import { groq } from "next-sanity";
import { ImageObject, ImageObjectType } from "../objects/imageObject";

import {
  linkGlobalObject,
  LinkGlobalObjectQueryResult,
} from "../objects/linkGlobalObject";
import {
  propertyCardObject,
  PropertyCardType,
} from "../objects/propertyCardObject";

export type featuredCardsQueryResult = {
  title: string;
  cta: LinkGlobalObjectQueryResult;
  cards: PropertyCardType[];
};

export const featuredCardsSection = groq`
  _type == "featuredCards" => {
    title,
    cta {
      ${linkGlobalObject}
    }, 
    cards[]->{
      ${propertyCardObject}
    }
  }
`;
