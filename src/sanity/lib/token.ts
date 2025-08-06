import 'server-only'

import { experimental_taintUniqueValue } from 'react'

export const sanityReadToken = process.env.SANITY_API_READ_TOKEN

if (!sanityReadToken) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}

experimental_taintUniqueValue(
  'Do not pass the Sanity API read token to the client.',
  process,
  sanityReadToken,
)
