import { groq, PortableTextBlock } from 'next-sanity'

export type EditorialTextQueryResult = {
  title: string
  highlight_text: string
  layout: 'list-text' | 'text-list'
  list_items: {
    _key: string
    title: string
    description: PortableTextBlock | null
  }[]
}
export const editorialText = groq`
  _type == "editorial-text" => {
    title,
    highlight_text,
    layout,
    list_items[]{
      _key,
      title,
      description,
    }
  }
`
