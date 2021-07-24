import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderDto, OrderDtoWithProducts } from "../../model/Order";
import OrderRepository from "../../repository/OrderRepository";
import { RootState } from "../store";

export interface OrderState {
  status: 'Idle' | 'Loading' | 'Failed'
  myOrders: OrderDtoWithProducts[]
}

const initialState: OrderState = {
  status: 'Idle',
  myOrders: []
}

export const makeOrder = createAsyncThunk('order/makeOrder', async ( payload: {data: OrderDto, auth: string}) => {
  const repo = new OrderRepository()
  try {
    await repo.makeOrder(payload.data, payload.auth)
  } catch (err) {
    throw new Error(err.message)
  }
})

export const getOrderList = createAsyncThunk('order/getOrderList', async (payload :{auth: string}) => {
  const repo = new OrderRepository()
  try {
    return await repo.listMyOrders(payload.auth)
  } catch (e) {
    throw new Error(e)
  }
})

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //makeOrder
    builder.addCase(makeOrder.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(makeOrder.rejected, (state) => {
      state.status = 'Failed'
    })
    builder.addCase(makeOrder.fulfilled, (state) => {
      state.status = 'Idle'
    })
    //getOrderList
    builder.addCase(getOrderList.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(getOrderList.rejected, (state) => {
      state.status = 'Failed'
      state.myOrders = []
    })
    builder.addCase(getOrderList.fulfilled, (state, payload) => {
      state.status = 'Idle'
      state.myOrders = payload.payload
    })
  }
})

export default OrderSlice.reducer

export const SelectOrder = (state: RootState) => state.order