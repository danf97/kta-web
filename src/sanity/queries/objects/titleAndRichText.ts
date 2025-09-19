import { groq } from "next-sanity";

export type TitleAndRichTextObjectType = {
  _key: string;
  _type: "title-and-rich-text";
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[];
};

export const titleAndRichTextObject = groq`
  _type == "title-and-rich-text" => {
    _key, 
    _type,
    title,
    content[]{
      ...,
    }
  }
`;
