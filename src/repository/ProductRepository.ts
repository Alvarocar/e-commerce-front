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