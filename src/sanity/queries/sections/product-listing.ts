import { groq } from 'next-sanity'
import {
  productCardObject,
  ProductCardObjectQueryResult,
} from '../objects/productCardObject'

export type ProductListingQueryResult = {
  title: string
  listType: 'collection' | 'single_products'
} & (
  | {
      listType: 'collection'
      collection: {
        slug: string
        id: string
      }
    }
  | {
      listType: 'single_products'
      products: ProductCardObjectQueryResult[]
    }
)

export const productListing = groq`
  _type == "product-listing" => {
    title,
    listType,
    listType == "collection" => {
      collection->{
        "slug": store.slug.current,
        "id": store.gid
      }
    },
    listType == "single_products" => {
      "products": singleProducts[]->{
       ${productCardObject}
      }
    }
  }
`
