import { sanityFetch } from '../lib/client'
import { PAGE_QUERY, PageQueryResult } from '../queries/documents/page-template'

export const getSanityPage = async ({
  slug,
}: {
  slug: string
}): Promise<PageQueryResult> => {
  const data = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  })

  return data
}
