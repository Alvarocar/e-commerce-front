import { ProductDto } from "./Product";

export interface CartItem {
  product: ProductDto
  quantity: number
  totalByProduct: number
}

export interface CartItemDto {
  product: number
  quantity: number
  price: number
}