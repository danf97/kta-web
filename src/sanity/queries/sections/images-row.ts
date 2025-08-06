import { groq } from 'next-sanity'

export type ImagesRowQueryResult = {
  title: string
  images: {
    _key: string
    url: string
  }[]
}

export const imagesRow = groq`
  _type == "images-row" => {
    title,
    images[]{
      _key,
      "url": asset->url
    }
  }
`
