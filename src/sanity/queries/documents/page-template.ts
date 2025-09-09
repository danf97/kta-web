import { defineQuery } from "next-sanity";
import { sectionsQuery, sectionsQueryResult } from "../sections";
import { seoObject, SeoObjectType } from "../objects/seoObject";
import { pageHeadObject, pageHeadObjectType } from "../objects/pageHeadObject";
import {
  pageSettingsObject,
  PageSettingsObjectType,
} from "../objects/pageSettingsObject";

export type PageQueryResult = {
  meta: {
    slug: string;
    lang: string;
  };
  seo: SeoObjectType;
  sections: sectionsQueryResult;
  pageSettings: PageSettingsObjectType;
} & pageHeadObjectType;

export const PAGE_QUERY = defineQuery(`*[
 _type == "page" && lang == $lang && slug.current == $slug
][0]{
  "meta": {
    "slug": slug.current,
    "lang": lang
  },
  ${pageHeadObject},
  ${seoObject},
  ${sectionsQuery},
  ${pageSettingsObject}
}
`);
// export const PAGE_QUERY = defineQuery(`*[
//  _type == "page" && lang == $lang && slug.current == $slug
// ][0]{
//    "meta": {
//     "slug": slug.current,
//     "lang": lang
//   },
//   title,
//   // ${pageHeadObject},
//   // ${seoObject},
//   // ${sectionsQuery},
//   // ${pageSettingsObject}
// }
// `);
