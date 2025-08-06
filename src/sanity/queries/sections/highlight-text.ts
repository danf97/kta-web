import { groq } from 'next-sanity'

export type HighlightTextQueryResult = {
  text: string
}

export const highlightText = groq`
  _type == "highlight-text" => {
    text,
  }
`
