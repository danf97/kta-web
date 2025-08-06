import { groq } from 'next-sanity'

export type SeoObjectType = {
  title: string | null
  description: string | null
  image: {
    url: string | null
  }
} | null

export const seoObject = groq`
  seo {
    title,
    description,
    image {
      "url": asset->url
    }
  }
`
