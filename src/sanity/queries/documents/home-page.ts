import { defineQuery } from "next-sanity";
import { sectionsQuery, sectionsQueryResult } from "../sections";
import { seoObject, SeoObjectType } from "../objects/seoObject";
import {
  pageSettingsObject,
  PageSettingsObjectType,
} from "../objects/pageSettingsObject";

export type HomePageQueryResult = {
  meta: {
    slug: string;
    lang: string;
  };
  seo: SeoObjectType;
  // sections: sectionsQueryResult;
  pageSettings: PageSettingsObjectType;
};

export const HOME_PAGE_QUERY = defineQuery(`*[
    _type == "home" && _id == $slug
  ][0]{
    "meta": {
      "slug": "home",
      "lang": lang
    },
    ${seoObject},
    ${pageSettingsObject},
  }
`);

console.log("HOME_PAGE_QUERY", HOME_PAGE_QUERY);
