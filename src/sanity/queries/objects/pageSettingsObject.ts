import { groq } from "next-sanity";

export type PageSettingsObjectType = {
  pageColor: "sand" | "blue" | null;
  image: {
    url: string | null;
  };
} | null;

export const pageSettingsObject = groq`
  pageSettings {
    pageColor,
    image {
      "url": asset->url
    }
  }
`;
