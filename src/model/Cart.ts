import { ProductDao } from "./Product";

export interface CartItem {
  product: ProductDao
  quantity: number
  totalByProduct: number
}