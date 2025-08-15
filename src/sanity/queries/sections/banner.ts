import { groq } from "next-sanity";
import { ImageObject, ImageObjectType } from "../objects/imageObject";

import {
  linkGlobalObject,
  LinkGlobalObjectQueryResult,
} from "../objects/linkGlobalObject";

export type BannerQueryResult = {
  title: string;
  message: string;
  cta: LinkGlobalObjectQueryResult;
  image: ImageObjectType;
};

export const bannerSection = groq`
  _type == "banner" => {
    title,
    message,
    cta {
      ${linkGlobalObject}
    }, 
   image {
    ${ImageObject}
  },
  }
`;
