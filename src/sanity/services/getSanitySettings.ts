import { sanityFetch } from '../lib/client'
import {
  SETTINGS_QUERY,
  SettingsQueryResult,
} from '../queries/documents/settings'

export const getSanitySettings = async (): Promise<SettingsQueryResult> => {
  const data = await sanityFetch({
    query: SETTINGS_QUERY,
  })

  return data as SettingsQueryResult
}
