import { groq } from "next-sanity";

import { quoteSection, QuoteSectionQueryResult } from "./quote";
import {
  cardsSliderSection,
  cardsSliderSectionQueryResult,
} from "./cards-slider";

export type SectionType<T> = {
  _type: string;
  _key: string;
} & T;

export type sectionsQueryResult = SectionType<
  QuoteSectionQueryResult | cardsSliderSectionQueryResult
>;

export const sectionsQuery = groq`
  sections[] {
    _type,
    _key,
    ${quoteSection},
    ${cardsSliderSection}
  }
`;
