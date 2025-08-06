import { CookiesContext } from '@/context/cookies-context'
import { CustomProduct } from '@/lib/shopify/types'
import { CartLine, Product } from '@shopify/hydrogen-react/storefront-api-types'
import {
  AnalyticsEventName,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  ShopifyAnalyticsProduct,
  ShopifyPageViewPayload,
  ShopifySalesChannel,
  useShopifyCookies,
} from '@shopify/hydrogen-react'
import {
  CurrencyCode,
  LanguageCode,
} from '@shopify/hydrogen-react/storefront-api-types'
import { useContext } from 'react'

export const pageTypes = {
  article: 'article',
  blog: 'blog',
  captcha: 'captcha',
  cart: 'cart',
  collection: 'collection',
  customersAccount: 'customers/account',
  customersActivateAccount: 'customers/activate_account',
  customersAddresses: 'customers/addresses',
  customersLogin: 'customers/login',
  customersOrder: 'customers/order',
  customersRegister: 'customers/register',
  customersResetPassword: 'customers/reset_password',
  forbidden: '403',
  giftCard: 'gift_card',
  home: 'index',
  listCollections: 'list-collections',
  notFound: '404',
  page: 'page',
  password: 'password',
  policy: 'policy',
  product: 'product',
  search: 'search',
  ADD_TO_CART: 'ADD_TO_CART',
}

export type pageTypesType = keyof typeof pageTypes

export const googlePageViewEvents = {
  cart: 'view_cart',
  collection: 'view_item_list',
  listCollections: 'view_item_list',
  product: 'view_item',
}

export type googlePageViewEventsType = keyof typeof googlePageViewEvents

export const pathnameResolver = (pathname: string): pageTypesType => {
  const path = pathname.replace(/^\/[a-z]{2}(\/.*)?$/, '$1')
  if (path === '') return 'home'
  if (path === '/cart') return 'cart'
  if (path === '/search') return 'search'
  if (path.includes('collections')) return 'listCollections'
  if (path.includes('products')) return 'product'
  if (path.includes('pages')) return 'page'
  if (path.includes('blogs')) return 'blog'
  if (path.includes('articles')) return 'article'
  if (path.includes('account')) return 'customersAccount'
  if (path.includes('activate_account')) return 'customersActivateAccount'
  if (path.includes('addresses')) return 'customersAddresses'
  if (path.includes('login')) return 'customersLogin'
  if (path.includes('order')) return 'customersOrder'
  if (path.includes('register')) return 'customersRegister'
  if (path.includes('account/recover')) return 'customersResetPassword'
  if (path.includes('403')) return 'forbidden'
  if (path.includes('gift_card')) return 'giftCard'
  if (path.includes('password')) return 'password'
  if (path.includes('policies')) return 'policy'
  return 'notFound'
}

export const setGoogleAnalyticsConcent = ({
  hasConcent,
  allowPersonalization,
  allowAnalytics,
}: {
  hasConcent: boolean
  allowPersonalization: boolean
  allowAnalytics: boolean
}) => {
  // check if window is defined
  if (typeof window !== 'undefined' && 'gtag' in window) {
    console.log('Setting Google Analytics consent')
    ;(window as any).gtag('consent', 'update', {
      ad_storage: hasConcent ? 'granted' : 'denied',
      ad_user_data: allowPersonalization ? 'granted' : 'denied',
      ad_personalization: allowPersonalization ? 'granted' : 'denied',
      analytics_storage: allowAnalytics ? 'granted' : 'denied',
    })
  }
}

type SendPageViewPayload = {
  pageType?: string
  products?: ShopifyAnalyticsProduct[]
  collectionHandle?: string
  searchString?: string
  totalValue?: number
  cartId?: string
}

type SendAddToCartPayload = {
  cartId: string
  product: CustomProduct
  totalValue?: ShopifyPageViewPayload['totalValue']
}

type AnalyticsEventNameType = keyof typeof AnalyticsEventName

export const useShopifyAnalytics = (
  shopId: string,
  currency: CurrencyCode,
  language: LanguageCode,
) => {
  const { consentData } = useContext(CookiesContext)

  // Send page view event
  const sendPageView = (
    eventName: pageTypesType,
    payload?: SendPageViewPayload,
  ) => {
    // googleAnalyticsEvent('page_view', {});

    return sendShopifyAnalytics({
      eventName: pageTypes[eventName] as AnalyticsEventNameType,
      payload: {
        ...getClientBrowserParameters(),
        hasUserConsent: consentData.allowAnalytics,
        shopifySalesChannel: ShopifySalesChannel.headless,
        shopId: `${shopId}`,
        currency: currency,
        acceptedLanguage: language,
        ...payload,
      },
    })
  }

  // Send add to cart event
  const sendAddToCart = ({
    cartId,
    totalValue,
    product,
  }: SendAddToCartPayload) => {
    if (!consentData.allowAnalytics) return null

    const productResolver = (
      product: CustomProduct,
    ): ShopifyAnalyticsProduct[] => {
      const variant = product.variants.edges[0]?.node
      return [
        {
          productGid: product.id,
          name: product.title,
          brand: product.vendor,
          variantGid: variant?.id,
          variantName: variant?.title,
          price: variant?.price.amount || '',
          quantity: 1,
          sku: variant?.sku,
        },
      ]
    }

    sendGAaddToCart(product)

    return sendPageView('ADD_TO_CART', {
      cartId,
      totalValue,
      products: productResolver(product),
    })
  }

  // Set up cookies for Shopify analytics & enable user consent
  useShopifyCookies({
    hasUserConsent: consentData.allowAnalytics,
  })

  // Google Analytics: Send page view event
  const sendGAPageView = () => {
    if (!consentData.allowAnalytics) return null

    googleAnalyticsEvent('page_view', {})
  }

  // Google Analytics: Send item view event
  const sendGAItemView = (product: Product) => {
    if (!consentData.allowAnalytics) return null

    googleAnalyticsEvent('view_item', {
      currency,
      value: Number(product.variants.edges[0]?.node.price.amount || 0),
      items: [product],
    })
  }

  // Google Analytics: Send add to cart event
  const sendGAaddToCart = (product: Product) => {
    if (!consentData.allowAnalytics) return null

    googleAnalyticsEvent('add_to_cart', {
      currency,
      value: Number(product.variants.edges[0]?.node.price.amount || 0),
      items: [product],
    })
  }

  // Google Analytics: Send begin checkout event
  const sendGAbeginCheckout = (cost: any, lines: any) => {
    googleAnalyticsEvent('begin_checkout', {
      currency,
      value: Number(cost?.totalAmount?.amount || 0),
      items: lines,
    })
  }

  // Google Analytics events
  const googleAnalyticsEvent = (eventName: GoogleEventNames, payload: any) => {
    if (typeof window === 'undefined' || !('gtag' in window)) return

    ;(window as any).gtag('event', eventName, {
      ...googleEventsResolver(eventName, payload),
    })
  }

  return {
    sendPageView,
    sendAddToCart,
    // Google Analytics
    sendGAPageView,
    sendGAItemView,
    sendGAbeginCheckout,
  }
}

type GoogleEventNames =
  | 'page_view'
  | 'add_to_cart'
  | 'view_item'
  | 'begin_checkout'

const googleEventsResolver = (eventName: GoogleEventNames, payload: any) => {
  if (eventName === 'page_view') {
    return {
      page_title: document.title,
      page_location: location.pathname,
    }
  } else if (eventName === 'view_item' || eventName === 'add_to_cart') {
    // View item details and Add to cart
    // https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#view_item_details
    // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_to_cart

    const product = payload.items[0] as Product
    const variant = product.variants.edges[0]?.node

    return {
      ...payload,
      items: [
        {
          item_id: variant?.id,
          item_name: product.title,
          affiliation: 'Headless',
          index: 0,
          item_brand: 'Slow Soaps',
          item_variant: variant?.title,
          price: Number(variant?.price.amount || 0),
          quantity: 1,
        },
      ],
    }
  } else if (eventName === 'begin_checkout') {
    // Begin checkout
    // https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#initiate_the_checkout_process
    const renderLines = (lines: CartLine[]) => {
      return lines.map(line => {
        return {
          item_id: line?.merchandise.id,
          item_name: line?.merchandise?.product.title,
          item_brand: 'Slow Soaps',
          item_variant: line?.merchandise?.title,
          price: Number(line?.merchandise?.price?.amount || 0),
          quantity: line.quantity,
        }
      })
    }

    return {
      ...payload,
      items: renderLines(payload.items),
    }
  }

  return null
}
