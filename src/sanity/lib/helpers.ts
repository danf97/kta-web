// import { groq } from 'next-sanity'

// export const refExtend = (
//   name: string,
//   isArray = false,
//   ext: Array<string> = [],
// ) => groq`
//   defined(${name})=>{
//     ${name}${isArray ? '[]->' : '->'}{
//       ...,
//       ${ext.join(',')}
//     }
//   }
//   `

// export const extent = (
//   name: string,
//   isArray = false,
//   ext: Array<string> = [],
// ) =>
//   groq`defined(${name})=>{
//     ${name}${isArray ? '[]' : ''}{
//       ...,
//       ${ext.join(',')}
//     }
//   }`

// // @ts-ignore
// export const internal = groq`internal->{${slug}}`

// export const checkBrokenLink = groq`"isBroken":select(
//   defined(internal)=>false,
//   defined(external)=>false,
//   true
// ),
// `

// export const extractLink = groq`"href": select(
//   defined(internal)=>internal->slug.current,
//   defined(external)=>external,
//   null
// )`

// export const link = extent('link', false, [internal])

// export const customLink = extent('customLink', false, [
//   internal,
//   extractLink,
//   checkBrokenLink,
// ])

// export const markDefs = extent('markDefs', true, [customLink])

// export const button = extent('url', false, [
//   internal,
//   extractLink,
//   checkBrokenLink,
// ])

// export const buttons = extent('buttons', true, [button])

// export const richText = extent('richText', true, [markDefs, buttons])

// export const spotLight = refExtend('spotlight', false, [])

// export const faqs = refExtend('faqs', true)

// export const category = refExtend('categories', true)

// export const pageBuilder = extent('pageBuilder', true, [
//   richText,
//   buttons,
//   category,
//   faqs,
//   link,
// ])

// export const author = refExtend('author')
