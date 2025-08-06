import { groq } from 'next-sanity'
import {
  titleAndRichTextObject,
  TitleAndRichTextObjectType,
} from '../objects/titleAndRichText'

export type ProductDetailsQueryResult = {
  title: string
  details_items: TitleAndRichTextObjectType[]
  ingredients: string
  legal_unit_size: string
  legal_logos: {
    url: string
  }
}

export const productDetails = groq`
  _type == "product-details" => {
    title,
    details_items[]{
      ${titleAndRichTextObject}
    },
    ingredients,
    legal_unit_size,
    legal_logos {
      "url": asset->url
    }
  }
`
