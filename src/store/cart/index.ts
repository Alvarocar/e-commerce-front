import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../model/Cart";
import { ProductDao } from "../../model/Product";
import { RootState } from "../store";

/**
 * cartKey is the key used to store the shopping cart state
 * in the LocalStorage
 */
export const cartKey = 'DjacketCart'

export interface CartState {
  productsCount: number
  products: Array<CartItem>
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
      const price = Number(action.payload.product.price) * action.payload.quantity
      if (index < 0) {
        state.products = [...state.products, 
            { product: action.payload.product,
              quantity: action.payload.quantity,
              totalByProduct: price }]
      } else {
        const currentProduct = state.products[index]
        state.products[index] = { 
          ...currentProduct,
           quantity: currentProduct.quantity + action.payload.quantity,
           totalByProduct: currentProduct.totalByProduct + price
          }
      }
      state.productsCount += action.payload.quantity
      state.total += price
      localStorage.setItem(cartKey, JSON.stringify(state))
    },
    deleteFullCartItem(state, action: PayloadAction<ProductDao>) {
      const index  = state.products.findIndex(item => item.product.id === action.payload.id)
      if (index < 0)
        return
      const currentItem = state.products[index]
      state.productsCount -= currentItem.quantity
      state.total -= currentItem.totalByProduct
      state.products = state.products.filter(item => item.product.id !== currentItem.product.id)
      localStorage.setItem(cartKey, JSON.stringify(state))
    },
    deleteCartItem(state, action: PayloadAction<{productId: number, quantity: number}>) {
      const index  = state.products.findIndex(item => item.product.id === action.payload.productId)
      if (index < 0)
        return
        const currentItem = state.products[index]
        let withdrawal = Number(currentItem.product.price) * action.payload.quantity 
        let quantity = action.payload.quantity

      if (action.payload.quantity >= currentItem.quantity 
            || withdrawal > currentItem.totalByProduct) {
        withdrawal = currentItem.totalByProduct
        quantity = currentItem.quantity
        state.products = state.products.filter(item => item.product.id !== currentItem.product.id)
      } else {
        state.products[index].totalByProduct -= withdrawal
        state.products[index].quantity -= action.payload.quantity
      }
      state.productsCount -= quantity
      state.total -= withdrawal
      localStorage.setItem(cartKey, JSON.stringify(state))
    }
  }
})

export const { addCartItem, deleteFullCartItem, deleteCartItem } = CartSlice.actions

export const selectCart = (root: RootState) => root.cart

export default CartSlice.reducer
