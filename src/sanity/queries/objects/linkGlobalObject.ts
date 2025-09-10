import { groq } from "next-sanity";

export type LinkGlobalObjectQueryResult = {
  linkType: "internal" | "external" | "anchor" | "action" | "social";
  title: string;
  description: string;
} & (
  | {
      linkType: "internal";
      internalLink: {
        _type: "collection" | "page" | "product" | "policyDocument";
        slug: string;
        lang?: string; // Only available for pages
        url: string;
      };
    }
  | {
      linkType: "external";
      externalLink: {
        url: string;
        target: "_blank" | "_self";
      };
    }
  | {
      linkType: "social";
      externalLink: {
        url: string;
        target: "_blank" | "_self";
      };
      icon: "instagram" | "x" | "tiktok" | null;
    }
  | {
      linkType: "anchor";
      anchor: string;
    }
  | {
      linkType: "action";
      action: "open_cookie_preferences" | "open_bag" | "open_my_account";
    }
);

const internalLinkResolver = groq`
  "internalLink": linkReference->{
    _type,
    _type == "collection" => {
      "slug": store.slug.current,
      "url": "/collections/" + store.slug.current,
    },
    _type == "page" => {
      lang,
      "slug": slug.current,
      "url": "/" + slug.current,
      ...
    },
    _type == "policyDocument" => {
      lang,
      "slug": slug.current,
      "url": "/policies/" + slug.current,
    },
    _type == "property" => {
      lang,
      "slug": store.slug.current,
      "url": "/properties/" + store.slug.current,
    }
  }
`;

const propertyLinkResolver = groq`
  "internalLink": linkReference->{
    _type,
    _type == "property" => {
      lang,
      "slug": store.slug.current,
      "url": "/properties/" + store.slug.current,
    }
  }
`;

const linkResolver = groq`
  linkType == "internal" => {
    ${internalLinkResolver}
  },
  linkType == "external" => {
    "externalLink": {
      "url" : linkExternal.url,
      linkExternal.newWindow == true => {
        "target": "_blank"
      },
      linkExternal.newWindow == false => {
        "target": "_self"
      }
    }
  },
  linkType == "social" => {
    "externalLink": {
      "url" : linkExternal.url,
      linkExternal.newWindow == true => {
        "target": "_blank"
      },
      linkExternal.newWindow == false => {
        "target": "_self"
      }
    },
    icon
  },
  linkType == "anchor" => {
    "anchor": linkAnchor
  },
  linkType == "action" => {
    "action": linkAction
  }
`;

export const linkGlobalObject = groq`
  _type == "linkGlobal" => {
    linkType,
    title,
    description,
    ${linkResolver}
  }
`;
