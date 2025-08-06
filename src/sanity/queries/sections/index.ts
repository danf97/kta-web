import { groq } from 'next-sanity'
import { homeHeroSection, HomeHeroSectionQueryResult } from './home-hero'
import {
  imageAndCtaSection,
  ImageAndCtaSectionQueryResult,
} from './image-and-cta'
import { quoteSection, QuoteSectionQueryResult } from './quote'
import { cardsListing, CardsListingQueryResult } from './cards-listing'
import { productListing, ProductListingQueryResult } from './product-listing'
import { VideoSection, VideoSectionQueryResult } from './video'
import { imagesRow, ImagesRowQueryResult } from './images-row'
import { productDetails, ProductDetailsQueryResult } from './product-details'
import { editorialText, EditorialTextQueryResult } from './editorial-text'
import { highlightText, HighlightTextQueryResult } from './highlight-text'
import { imageText, ImageTextQueryResult } from './image-text'
import { resultNumbers, ResultNumbersQueryResult } from './result-numbers'

export type SectionType<T> = {
  _type: string
  _key: string
} & T

export type sectionsQueryResult = Array<
  {
    _type: string
    _key: string
  } & (
    | HomeHeroSectionQueryResult
    | EditorialTextQueryResult
    | HighlightTextQueryResult
    | ImageAndCtaSectionQueryResult
    | ImagesRowQueryResult
    | ProductDetailsQueryResult
    | QuoteSectionQueryResult
    | CardsListingQueryResult
    | ProductListingQueryResult
    | VideoSectionQueryResult
    | ImageTextQueryResult
    | ResultNumbersQueryResult
  )
>

export const sectionsQuery = groq`
  _type,
  _key,
  ${cardsListing},
  ${homeHeroSection},
  ${editorialText},
  ${highlightText},
  ${imageAndCtaSection},
  ${imagesRow},
  ${productDetails},
  ${quoteSection},
  ${productListing},
  ${VideoSection},
  ${imageText},
  ${resultNumbers}
`
