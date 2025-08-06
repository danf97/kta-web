import { sanityFetch } from '../lib/client'
import {
  HOME_PAGE_QUERY,
  HomePageQueryResult,
} from '../queries/documents/home-page'

export const getSanityHomePage = async (
  args?: any,
): Promise<HomePageQueryResult> => {
  const data = await sanityFetch({
    query: HOME_PAGE_QUERY,
  })

  return data as HomePageQueryResult
}
