import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderDto } from "../../model/Order";
import OrderRepository from "../../repository/OrderRepository";
import { RootState } from "../store";

export interface OrderState {
  status: 'Idle' | 'Loading' | 'Failed'
}

const initialState: OrderState = {
  status: 'Idle'
}

export const makeOrder = createAsyncThunk('order/makeOrder', async ( payload: {data: OrderDto, auth: string}) => {
  const repo = new OrderRepository()
  try {
    await repo.makeOrder(payload.data, payload.auth)
  } catch (err) {
    throw new Error(err.message)
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
  }
})

export default OrderSlice.reducer

export const SelectOrder = (state: RootState) => state.order