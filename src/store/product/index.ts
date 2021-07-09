import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductDao } from "../../model/Product";
import { getLatestProducts } from '../../repository/ProductRepository'
import { RootState } from "../store";

export interface ProductState {
  products: Array<ProductDao>,
  status: 'Idle' | 'Loading' | 'Failed'
}

const initialState: ProductState = {
  products: [],
  status: 'Idle'
}

export const getAsyncLatestProducts = createAsyncThunk('product/latest-products', async () => {
  try {
    const products = await getLatestProducts()
    return products
  } catch(e) {
    throw new Error(e.message)
  }
})

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAsyncLatestProducts.pending, (state) => {
      state.status = 'Loading'
    })
    .addCase(getAsyncLatestProducts.fulfilled, (state, action) => {
      state.status = 'Idle'
      state.products = action.payload
    })
  }
})

export const selectProduct = (state: RootState) => state.product

export default ProductSlice.reducer