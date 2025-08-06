import { defineQuery } from 'next-sanity'
import { sectionsQuery, sectionsQueryResult } from '../sections'
import { ImageObject, ImageObjectType } from '../objects/imageObject'
import { seoObject, SeoObjectType } from '../objects/seoObject'

export type PageQueryResult = {
  meta: {
    slug: string
    lang: string
  }
  title: string
  altTitle: string
  title_size: 'large' | 'medium'
  image: ImageObjectType
  seo: SeoObjectType
  sections: sectionsQueryResult
}

export const PAGE_QUERY = defineQuery(`*[
 _type == "page" && slug.current == $slug
][0]{
   "meta": {
    "slug": slug.current,
    "lang": lang
  },
  title,
  altTitle,
  title_size,
  image {
    ${ImageObject}
  },
  ${seoObject},
  sections[] {
    ${sectionsQuery}
  }
}
`)
