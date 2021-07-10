import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDao } from "../../model/Product";
import { RootState } from "../store";

/**
 * cartKey is the key used to store the shopping cart state
 * in the LocalStorage
 */
export const cartKey = 'DjacketCart'

export interface CartState {
  productsCount: number
  products: Array<{product: ProductDao, quantity: number}>
  total: number
}

const initialState = (): CartState => {
  const stringCart = localStorage.getItem(cartKey)
  if (stringCart) {
    const cart: CartState = JSON.parse(stringCart)
    return cart
  }
  const cart: CartState = { productsCount: 0, products: [], total: 0 }
  localStorage.setItem(cartKey, JSON.stringify(cart))
  return cart
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initialState(),
  reducers: {
    addCartItem(state, action: PayloadAction<{product: ProductDao, quantity: number}>) {
      const index  = state.products.findIndex(item => item.product.id === action.payload.product.id)
      if (index < 0) {
        state.products = [...state.products, 
            {product: action.payload.product, quantity: action.payload.quantity }]
      } else {
        const currentProduct = state.products[index]
        state.products[index] = { ...currentProduct, quantity: currentProduct.quantity + action.payload.quantity }
      }
      state.productsCount += action.payload.quantity
      localStorage.setItem(cartKey, JSON.stringify(state))
    }
  }
})

export const { addCartItem } = CartSlice.actions

export const selectCart = (root: RootState) => root.cart

export default CartSlice.reducer
