import { groq, PortableTextBlock } from 'next-sanity'

export type ResultNumbersQueryResult = {
  title: string
  block: {
    _key: string
    title: string
    details: string
    results: {
      _key: string
      number: number
      text: PortableTextBlock | null
    }[]
  }[]
}

export const resultNumbers = groq`
  _type == "result-numbers" => {
    title,
    block[] {
      _key,
      title,
      details,
      results[]{
        _key,
        number,
        text,
      }
    }
  }
`
