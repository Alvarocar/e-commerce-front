import { CartItemDto, CartItemDtoWithProducts } from "./Cart";

export interface OrderDto {
  first_name: string
  last_name: string
  email: string
  address: string
  zipcode: string
  place: string
  phone: string
  items: CartItemDto[]
  stripe_token: string
  id?: number
}

export interface OrderDtoWithProducts {
  first_name: string
  last_name: string
  email: string
  address: string
  zipcode: string
  place: string
  phone: string
  items: CartItemDtoWithProducts[]
  stripe_token: string
  id?: number
}