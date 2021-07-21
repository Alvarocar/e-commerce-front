import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from './product';
import cartReducer from './cart'
import userReducer from './user'
import orderReducer from './order'

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
