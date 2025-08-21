import { sanityFetch } from "../lib/client";
import {
  PROPERTY_QUERY,
  PropertyQueryResult,
} from "../queries/documents/property";

export const getSanityProperty = async ({
  lang,
  slug,
}: {
  lang: string;
  slug: string;
}): Promise<PropertyQueryResult> => {
  const data = await sanityFetch({
    query: PROPERTY_QUERY,
    params: { slug, lang },
  });

  return data;
};
