import { sanityFetch } from '../lib/client'
import { SettingsQueryResult } from '../queries/documents/settings'
import { STRINGS_QUERY, StringsQueryResult } from '../queries/documents/strings'

export const getSanityStrings = async (): Promise<StringsQueryResult> => {
  const data = await sanityFetch({
    query: STRINGS_QUERY,
  })

  return data as StringsQueryResult
}
