import { groq, PortableTextBlock } from 'next-sanity'
import {
  linkGlobalObject,
  LinkGlobalObjectQueryResult,
} from '../objects/linkGlobalObject'

export type InfoCardObjectQueryResult = {
  _key: string
  title: string
  sub_title: string
  description: PortableTextBlock | null
  image: {
    url: string
  }
  cta: LinkGlobalObjectQueryResult
}

export type CardsListingQueryResult = {
  title: string
  cards: InfoCardObjectQueryResult[]
}

export const cardsListing = groq`
  _type == "cards-listing" => {
    title,
    cards[]{
      _key,
      title,
      sub_title,
      description,
      image {
        "url": asset->url
      },
      cta {
        ${linkGlobalObject}
      },
    }
  }
`
