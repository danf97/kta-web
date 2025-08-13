import { defineQuery } from "next-sanity";
import { sectionsQuery, sectionsQueryResult } from "../sections";
import { seoObject, SeoObjectType } from "../objects/seoObject";
import {
  pageSettingsObject,
  PageSettingsObjectType,
} from "../objects/pageSettingsObject";
import { pageHeadObject, pageHeadObjectType } from "../objects/pageHeadObject";

export type HomePageQueryResult = {
  meta: {
    slug: string;
    lang: string;
  };
  seo: SeoObjectType;
  sections: sectionsQueryResult;
  pageSettings: PageSettingsObjectType;
} & pageHeadObjectType;

export const HOME_PAGE_QUERY = defineQuery(`*[
    _type == "home" && _id == $slug
  ][0]{
    "meta": {
      "slug": "home",
      "lang": lang
    },
    ${pageHeadObject}
    ${seoObject},
    ${sectionsQuery},
    ${pageSettingsObject},
  }
`);

// const HOME_PAGE_QUERY2 = defineQuery(`*[
//     _type == "home" && _id == $slug
//   ][0]{
//     "meta": {
//       "slug": "home",
//       "lang": lang
//     },

//   title,
//   description,
//   cta {

//   _type == "linkGlobal" => {
//     linkType,
//     title,
//     description,

//   linkType == "internal" => {

//   "internalLink": linkReference->{
//     _type,
//     _type == "collection" => {
//       "slug": store.slug.current,
//       "url": "/collections/" + store.slug.current,
//     },
//     _type == "page" => {
//       lang,
//       "slug": slug.current,
//       "url": "/page/" + slug.current,
//       ...
//     },
//     _type == "policyDocument" => {
//       lang,
//       "slug": slug.current,
//       "url": "/policies/" + slug.current,
//     },
//     _type == "property" => {
//       lang,
//       "slug": store.slug.current,
//       "url": "/property/" + store.slug.current,
//     }
//   }

//   },
//   linkType == "external" => {
//     "externalLink": {
//       "url" : linkExternal.url,
//       linkExternal.newWindow == true => {
//         "target": "_blank"
//       },
//       linkExternal.newWindow == false => {
//         "target": "_self"
//       }
//     }
//   },
//   linkType == "social" => {
//     "externalLink": {
//       "url" : linkExternal.url,
//       linkExternal.newWindow == true => {
//         "target": "_blank"
//       },
//       linkExternal.newWindow == false => {
//         "target": "_self"
//       }
//     },
//     icon
//   },
//   linkType == "anchor" => {
//     "anchor": linkAnchor
//   },
//   linkType == "action" => {
//     "action": linkAction
//   }

//   }

//   },

//   seo {
//     title,
//     description,
//     image {
//       "url": asset->url
//     }
//   }
// ,

//   pageSettings {
//     pageColor,
//     image {
//       "url": asset->url
//     }
//   }
// ,
//   }
// `);
