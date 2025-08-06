import { defineQuery } from 'next-sanity'
import { sectionsQuery, sectionsQueryResult } from '../sections'
import { seoObject, SeoObjectType } from '../objects/seoObject'

export type HomePageQueryResult = {
  meta: {
    slug: string
    lang: string
  }
  seo: SeoObjectType
  sections: sectionsQueryResult
}

export const HOME_PAGE_QUERY = defineQuery(`*[
  _type == "home"
][0]{
   "meta": {
    "slug":"home",
    "lang": lang
  },
  ${seoObject},
  sections[] {
    ${sectionsQuery}
  }
}
`)
