import { groq, PortableTextBlock } from 'next-sanity'
import { ImageObject, ImageObjectType } from '../objects/imageObject'

export type ImageTextQueryResult = {
  layout: 'image-left' | 'image-right'
  title: string
  sub_title: string | null
  image: ImageObjectType | null
  content: PortableTextBlock | null
}

export const imageText = groq`
  _type == "image-text" => {
    layout,
    title,
    sub_title,
    image {
      ${ImageObject} 
    },
    content
  }
`
