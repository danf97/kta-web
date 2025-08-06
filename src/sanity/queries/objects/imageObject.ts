import { groq } from 'next-sanity'

export type ImageObjectType = {
  url: string | null
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export const ImageObject = groq`
  ..., 
  "url": asset->url
`
