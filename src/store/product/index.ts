import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryDao } from "../../model/Category";
import { ProductDao } from "../../model/Product";
import { getLatestProducts, getProductDetail, getProductByCategories } from '../../repository/ProductRepository'
import { RootState } from "../store";

export interface ProductState {
  products: Array<ProductDao>,
  status: 'Idle' | 'Loading' | 'Failed'
  selectedProduct: ProductDao | null
  productsByCategory: CategoryDao | null
}

const initialState: ProductState = {
  products: [],
  status: 'Idle',
  selectedProduct: null,
  productsByCategory: null
}

export const getAsyncLatestProducts = createAsyncThunk('product/latest-products', async () => {
  try {
    const products = await getLatestProducts()
    return products
  } catch(e) {
    throw new Error(e.message)
  }
})

export const getAsyncProduct = createAsyncThunk('product/product', async (
    args: { category_slug: string, product_slug: string }) => {
  try {
    const product = await getProductDetail(args.category_slug, args.product_slug)
    return product
  } catch(e) {
    throw new Error(e.message)
  }
})

export const getAsyncProductByCategory = createAsyncThunk('product/productByCategory', async (category_slug: string) => {
  try {
    const categoryDao = await getProductByCategories(category_slug)
    return categoryDao
  } catch (e) {
    throw new Error(e.message)
  }
})

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //getAsyncLatestProducts
    .addCase(getAsyncLatestProducts.pending, (state) => {
      state.status = 'Loading'
    })
    .addCase(getAsyncLatestProducts.fulfilled, (state, action) => {
      state.status = 'Idle'
      state.products = action.payload
    })
    //getAsyncProduct
    .addCase(getAsyncProduct.pending, (state) => {
      state.status = 'Loading'
    })
    .addCase(getAsyncProduct.fulfilled, (state, action) => {
      state.status = 'Idle'
      state.selectedProduct = action.payload
    })
    .addCase(getAsyncProduct.rejected, (state) => {
      state.status = 'Failed'
      state.selectedProduct = null
    })
    //getAsyncProductByCategory
    .addCase(getAsyncProductByCategory.pending, (state) => {
      state.status = 'Loading'
    })
    .addCase(getAsyncProductByCategory.fulfilled, (state, action) => {
      state.status = 'Idle'
      state.productsByCategory = action.payload
    })
    .addCase(getAsyncProductByCategory.rejected, (state) => {
      state.status = 'Failed'
      state.productsByCategory = null
    })
  }
})

export const selectProduct = (state: RootState) => state.product

export default ProductSlice.reducer