import { groq } from "next-sanity";

import { quoteSection, QuoteSectionQueryResult } from "./quote";

export type SectionType<T> = {
  _type: string;
  _key: string;
} & T;

export type sectionsQueryResult = Array<
  {
    _type: string;
    _key: string;
  } & QuoteSectionQueryResult
>;

export const sectionsQuery = groq`
  _type,
  _key,
  ${quoteSection},
`;
