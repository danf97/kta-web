import { translatableTextObjectType } from "@/sanity/queries/objects/translatableTextObject";

export const multilangFieldResolver = (
  field: translatableTextObjectType | null,
  lang: string
) => {
  return field?.[lang] || `{${field}}`;
};
