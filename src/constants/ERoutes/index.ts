enum ERoutes {
  HOME = "/",
  CART = "/cart",
  SUCCESS = "/cart/success",
  SEARCH = "/search",
  SIGNUP = "/sign-up",
  LOGIN = "/log-in",
  MYACCOUNT = "/my-account",
  CATEGORY = "/category/:category_slug",
  PRODUCT_PAGE = "/detail/:category_slug/:product_slug",
}

export const DynamicRoutes = {
  /**
   * @param slug category name (slug)
   */
  CATEGORY: (slug: string) => `/category/${slug}`,
  PRODUCT_PAGE: (category_slug: string, slug: string) => `/detail/${category_slug}/${slug}`,
  PRODUCT_PAGE_FULLPATH: (full_path: string) => `/detail${full_path}`
}

export default ERoutes