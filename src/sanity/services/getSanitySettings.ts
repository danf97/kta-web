import { sanityFetch } from "../lib/client";
import {
  SETTINGS_QUERY,
  SettingsQueryResult,
} from "../queries/documents/settings";

export const getSanitySettings = async (
  locale: string
): Promise<SettingsQueryResult> => {
  const data = await sanityFetch({
    query: SETTINGS_QUERY,
    params: {
      slug: "settings-" + locale,
    },
  });

  return data as SettingsQueryResult;
};
