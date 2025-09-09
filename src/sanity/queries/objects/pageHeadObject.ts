import { groq } from "next-sanity";
import {
  linkGlobalObject,
  LinkGlobalObjectQueryResult,
} from "./linkGlobalObject";

export type pageHeadObjectType = {
  title: string;
  description: string | null;
  cta: LinkGlobalObjectQueryResult;
};

export const pageHeadObject = groq`
  title,
  description,
  cta {
    ${linkGlobalObject}
  }
`;
