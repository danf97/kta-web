import { groq } from 'next-sanity'
import {
  linkGlobalObject,
  LinkGlobalObjectQueryResult,
} from './linkGlobalObject'

export type linkGroupObjectQueryResult = {
  title: string
  linkList: LinkGlobalObjectQueryResult[]
}

export const linkGroupObject = groq`
  _type == "linkGroup" => {
    title, 
    linkList[]{
      ${linkGlobalObject}
    }
  }
`
