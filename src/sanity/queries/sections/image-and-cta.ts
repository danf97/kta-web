import { groq, PortableTextBlock } from 'next-sanity'
import {
  linkGlobalObject,
  LinkGlobalObjectQueryResult,
} from '../objects/linkGlobalObject'
import {
  productCardObject,
  ProductCardObjectQueryResult,
} from '../objects/productCardObject'
import { ImageObject, ImageObjectType } from '../objects/imageObject'

export type ImageAndCtaSectionQueryResult = {
  tag: string | null
  title: string
  sub_title: string | null
  layout: string | null
  body_text: PortableTextBlock | null
  image: ImageObjectType | null
  cta: LinkGlobalObjectQueryResult | null
  product: ProductCardObjectQueryResult | null
}

export const imageAndCtaSection = groq`
  _type == "image-and-cta" => {
    tag,
    title,
    sub_title,
    layout,
    body_text,
    cta {
      ${linkGlobalObject}
    },
    image {
      ${ImageObject} 
    },
    "product": product->{
      ${productCardObject}
    }
  }
`
