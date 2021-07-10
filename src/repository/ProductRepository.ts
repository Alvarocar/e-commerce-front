import ECommerceAxios from "../api/ECommerceAxios";
import EMessage from "../constants/EMessage";
import { ProductDao } from "../model/Product";

const api = '/api/v1'

export const getLatestProducts = async (): Promise<ProductDao[]> => {
  try {
    const products = await ECommerceAxios.get<ProductDao[]>(`${api}/latest-products/`)
    return products.data
  } catch {
    throw new Error(EMessage.NetworkError)
  }
}

export const getProductDetail = async (category_slug: string,
   product_slug: string): Promise<ProductDao> => {
  try {
    const product = await ECommerceAxios.get<ProductDao>(`${api}/products/${category_slug}/${product_slug}`)
    return product.data
  } catch {
    throw new Error(EMessage.NetworkError)
  }
}