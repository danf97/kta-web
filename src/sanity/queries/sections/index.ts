import { groq } from "next-sanity";
import { homeHeroSection, HomeHeroSectionQueryResult } from "./home-hero";
import { quoteSection, QuoteSectionQueryResult } from "./quote";
import { cardsListing, CardsListingQueryResult } from "./cards-listing";
import { VideoSection, VideoSectionQueryResult } from "./video";
import { imagesRow, ImagesRowQueryResult } from "./images-row";
import { editorialText, EditorialTextQueryResult } from "./editorial-text";
import { highlightText, HighlightTextQueryResult } from "./highlight-text";
import { imageText, ImageTextQueryResult } from "./image-text";
import { resultNumbers, ResultNumbersQueryResult } from "./result-numbers";

export type SectionType<T> = {
  _type: string;
  _key: string;
} & T;

export type sectionsQueryResult = Array<
  {
    _type: string;
    _key: string;
  } & (
    | HomeHeroSectionQueryResult
    | EditorialTextQueryResult
    | HighlightTextQueryResult
    | ImagesRowQueryResult
    | QuoteSectionQueryResult
    | CardsListingQueryResult
    | VideoSectionQueryResult
    | ImageTextQueryResult
    | ResultNumbersQueryResult
  )
>;

export const sectionsQuery = groq`
  _type,
  _key,
  ${cardsListing},
  ${homeHeroSection},
  ${editorialText},
  ${highlightText},
  ${imagesRow},
  ${quoteSection},
  ${VideoSection},
  ${imageText},
  ${resultNumbers}
`;
