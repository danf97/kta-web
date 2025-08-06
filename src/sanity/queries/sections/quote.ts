import { groq } from 'next-sanity'

export type QuoteSectionQueryResult = {
  quote: string | null
  role: string | null
  author: string | null
}

export const quoteSection = groq`
  _type == "quote" => {
    quote,
    role,
    author,
  }
`
