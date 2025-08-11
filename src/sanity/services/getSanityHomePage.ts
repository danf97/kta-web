import { sanityFetch } from "../lib/client";
import {
  HOME_PAGE_QUERY,
  HomePageQueryResult,
} from "../queries/documents/home-page";

export const getSanityHomePage = async (
  locale: string
): Promise<HomePageQueryResult> => {
  const data = await sanityFetch({
    query: HOME_PAGE_QUERY,
    params: {
      slug: "home-" + locale,
    },
  });

  return data as HomePageQueryResult;
};
