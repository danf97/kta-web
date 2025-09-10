import { groq } from "next-sanity";

import {
  cardsSliderSection,
  cardsSliderSectionQueryResult,
} from "./cards-slider";
import {
  featuredCardsQueryResult,
  featuredCardsSection,
} from "./featured-cards";
import { BannerQueryResult, bannerSection } from "./banner";
import { cardsListSection, cardsListSectionQueryResult } from "./cards-list";

export type SectionType<T> = {
  _type: string;
  _key: string;
} & T;

export type sectionsQueryResult = SectionType<
  | BannerQueryResult
  | cardsSliderSectionQueryResult
  | cardsListSectionQueryResult
  | featuredCardsQueryResult
>;

export const sectionsQuery = groq`
  sections[] {
    _type,
    _key,
    ${bannerSection},
    ${cardsListSection},
    ${featuredCardsSection},
    ${cardsSliderSection}
  }
`;
