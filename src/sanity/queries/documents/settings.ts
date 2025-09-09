import { defineQuery } from "next-sanity";
import {
  linkGlobalObject,
  LinkGlobalObjectQueryResult,
} from "../objects/linkGlobalObject";
import {
  linkGroupObject,
  linkGroupObjectQueryResult,
} from "../objects/linkGroupObject";
import { sectionsQuery, sectionsQueryResult } from "../sections";

export type NavItem =
  | ({
      _type: "linkGroup";
    } & linkGroupObjectQueryResult)
  | ({
      _type: "linkGlobal";
    } & LinkGlobalObjectQueryResult);

export type SettingsQueryResult = {
  meta: {
    lang: string;
  };
  title: string;
  logo: {
    url: string;
  };
  header: {
    navigation: NavItem[];
  };
  footer: {
    heading: string;
    copy: string;
    navigation: NavItem[];
  };
  legal: {
    legalNav: NavItem[];
  };
  seo: {
    title: string;
    description: string;
    image: {
      url: string;
    };
  };
  product_sections: sectionsQueryResult;
};

export const SETTINGS_QUERY = defineQuery(`*[
  _type == "settings" && _id == $slug
][0]{
   "meta": {
    "lang": lang
  },
  // Brand
  title,
  logo {
    "url": asset -> url
  },
  // Navigation
  header {
    navigation[]{
      _type,
      ${linkGlobalObject},
      ${linkGroupObject}
    }
  },
  // Footer
  footer {
    heading,
    copy,
    navigation[]{
      _type,
      ${linkGlobalObject},
      ${linkGroupObject}
    }
  },
  // Policy pages
  legal {
    heading,
    copy,
    legalNav[]{
      _type,
      ${linkGlobalObject},
      ${linkGroupObject}
    }
  },
  // SEO
  seo{
    title, 
    description,
    image {
      "url": asset -> url
    }
  },
  // Product sections
  product_sections[] {
    ${sectionsQuery}
  }
}
`);
