import { groq } from "next-sanity";

export type translatableTextObjectType = {
  _type: "translatableText";
  [key: string]: string | null;
} | null;

export const translatableTextObject = groq`
  _type,
  en,
  pt,
`;
