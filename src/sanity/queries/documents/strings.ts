import { defineQuery } from 'next-sanity'

export type StringsQueryResult = {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  cart_bag_title: string | null
  cart_checkout_button: string | null
  cart_discount: string | null
  cart_is_empty_button: string | null
  cart_is_empty_message: string | null
  cart_is_empty_title: string | null
  cart_item_added_message: string | null
  cart_item_removed: string | null
  cart_item_removed_undo: string | null
  cart_our_recommendations: string | null
  cart_page_title: string | null
  cart_price: string | null
  cart_product: string | null
  cart_quantity: string | null
  cart_subtotal: string | null
  cart_taxes_included: string | null
  cart_view_button: string | null
  cart_view_empty_button: string | null
  continue_shopping_button: string | null
  pagination_label: string | null
  pagination_next_button: string | null
  pagination_page_number: string | null
  pagination_previous_button: string | null
  password_page_admin_link: string | null
  password_page_button: string | null
  password_page_error_message: string | null
  password_page_heading: string | null
  password_page_password_label: string | null
  password_page_password_placeholder: string | null
  password_page_powered_by_shopify: string | null
  password_page_submit_button: string | null
  product_add_to_cart_button: string | null
  product_no_reviews: string | null
  product_on_sale: string | null
  product_out_of_stock: string | null
  product_price: string | null
  product_rating: string | null
  product_related_products: string | null
  product_reviews: string | null
  product_reviews_average: string | null
  search_button: string | null
  search_reset_button: string | null
  share_close_button: string | null
  share_copy_button: string | null
  share_success_message: string | null
  share_url_label: string | null
  slider_label: string | null
  slider_next_button: string | null
  slider_of_label: string | null
  slider_previous_button: string | null
  social_facebook_alt: string | null
  social_facebook_link: string | null
  social_instagram_link: string | null
  social_pinterest_alt: string | null
  social_pinterest_link: string | null
  social_snapchat_link: string | null
  social_tiktok_link: string | null
  social_tumblr_link: string | null
  social_twitter_alt: string | null
  social_twitter_link: string | null
  social_vimeo_link: string | null
  social_youtube_link: string | null
}

export const STRINGS_QUERY = defineQuery(`*[
  _type == "strings" && _id == "strings"
][0]{
  ...
}
`)
