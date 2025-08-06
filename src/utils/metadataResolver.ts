import { Metadata } from 'next'
import {
  getSanityCollection,
  getSanityHomePage,
  getSanityPage,
  getSanityPolicy,
  getSanityProduct,
  getSanitySettings,
} from '@/app/sanity/services'
import { getCollection, getProduct } from '@/lib/shopify'

const documentFetchers = {
  sanity_home: getSanityHomePage,
  sanity_page: getSanityPage,
  sanity_policy: getSanityPolicy,
  sanity_product: getSanityProduct,
  shopify_product: getProduct,
  shopify_collection: getCollection,
  sanity_collection: getSanityCollection,
  custom: () => null,
  none: () => null,
}

export const metadataResolver = async ({
  slug,
  docType,
  locale,
  defaultData,
}: {
  slug: string
  docType: keyof typeof documentFetchers
  locale?: any
  defaultData?: {
    title?: string
    description?: string
    image?: string
  }
}): Promise<Metadata> => {
  const settings = await getSanitySettings()

  const defaultTitle = settings?.title
  const titleSeparator = ' | '
  const defaultDescription = settings.seo?.description
  const defaultImage =
    settings.seo?.image?.url + '?w=1600&h=900&q=75&fit=crop&auto=format'

  const titleResolver = (title?: string | null) => {
    return (
      (title ? title + titleSeparator + defaultTitle : defaultTitle) ||
      'Sapphire Dust'
    )
  }

  const imageResolver = (image?: string | null) => {
    return image || defaultImage
  }

  if (docType === 'none') {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
      title: titleResolver(),
      description: defaultDescription,
      ...(defaultImage && {
        openGraph: {
          images: [defaultImage],
        },
      }),
    }
  } else if (docType === 'custom') {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
      title: titleResolver(defaultData?.title),
      description: defaultData?.description || defaultDescription,
      ...(defaultData?.image && {
        openGraph: {
          images: [defaultData?.image],
        },
      }),
    }
  }

  let metadata

  try {
    if (docType === 'shopify_product') {
      const shopifyPage = await documentFetchers[docType](slug, locale)

      metadata = {
        title: shopifyPage.product.seo.title || shopifyPage.product.title,
        description:
          shopifyPage.product.seo.description ||
          shopifyPage.product.description,
        image:
          shopifyPage.product.featuredImage?.url +
          '&width=1200&height=1164&q=75&crop=center&auto=format',
      }
    } else if (docType === 'shopify_collection') {
      const shopifyPage = await documentFetchers[docType](slug, locale)

      metadata = {
        title:
          shopifyPage.collection?.seo.title || shopifyPage.collection?.title,
        description:
          shopifyPage.collection?.seo.description ||
          shopifyPage.collection?.description,
        image:
          shopifyPage.collection?.image?.url +
          '&width=1600&height=900&q=75&crop=center&auto=format',
      }
    } else {
      // Fetch Sanity documents
      const page = await documentFetchers[docType]({ slug })

      // Page metadata
      const title = page.seo?.title
        ? titleResolver(page.seo.title)
        : 'title' in page
          ? titleResolver(page.title)
          : titleResolver()
      const description = page.seo?.description

      const image = page.seo?.image.url
        ? imageResolver(page.seo?.image.url)
        : 'image' in page
          ? imageResolver(
              ('url' in
              (page.image as {
                url: string | null
              })
                ? (
                    page.image as {
                      url: string
                    }
                  ).url
                : null) as string | null,
            )
          : imageResolver()

      // Set the metadata
      metadata = {
        title: title,
        description: description,
        image: image,
      }
    }
  } catch (error) {
    // If an error occurs, set the metadata from the settings
    metadata = {
      title: titleResolver(),
      description: defaultDescription,
      image: defaultImage,
    }
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      images: [metadata.image || ''],
    },
  }
}
