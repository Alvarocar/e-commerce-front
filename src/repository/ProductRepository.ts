import ECommerceAxios from "../api/ECommerceAxios";
import EMessage from "../constants/EMessage";
import { CategoryDto } from "../model/Category";
import { ProductDto } from "../model/Product";

const api = '/api/v1'

export const getLatestProducts = async (): Promise<ProductDto[]> => {
  try {
    const products = await ECommerceAxios.get<ProductDto[]>(`${api}/latest-products/`)
    return products.data
  } catch {
    throw new Error(EMessage.NetworkError)
  }
}

export const getProductDetail = async (category_slug: string,
   product_slug: string): Promise<ProductDto> => {
  try {
    const product = await ECommerceAxios.get<ProductDto>(`${api}/products/${category_slug}/${product_slug}`)
    return product.data
  } catch {
    throw new Error(EMessage.NetworkError)
  }
}

export const getProductByCategories = async (
    category_slug: string): Promise<CategoryDto> => {
  try {
    const categoryDao = await ECommerceAxios.get<CategoryDto>(`${api}/products/${category_slug}/`)
    return categoryDao.data
  } catch {
    throw new Error(EMessage.NetworkError)
  }
}

export const searchProducts = async (query: string): Promise<ProductDto[]> => {
  try {
    const products = await ECommerceAxios
          .post<ProductDto[]>(`${api}/products/search/`, { query })
    return products.data
  } catch {
    throw new Error(EMessage.NetworkError)
  }
}