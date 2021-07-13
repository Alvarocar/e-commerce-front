import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { EUser } from "../../constants/EMessage"
import UserRepository from "../../repository/UserRepository"
import { RootState } from "../store"

export interface UserState {
  username: string | null,
  status: 'Idle' | 'Loading' | 'Failed'
}

const initialState: UserState = {
  username: null,
  status: 'Idle'
}

export const doSignUp = createAsyncThunk('user/signup',
  async (user: {username: string, password: string}) => {
  const repository = new UserRepository()
  try {
    await repository.signUp(user.username, user.password)
    toast.success(EUser.SUCCESS_SIGNUP, {
      position: 'bottom-right',
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    })
  } catch (e) {
    toast.error(e.message, {
      position: 'bottom-right',
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    })
    throw new Error(e.message)
  }
})

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doSignUp.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(doSignUp.rejected, (state) => {
      state.status = 'Failed'
    })
    builder.addCase(doSignUp.fulfilled, (state) => {
      state.status = 'Idle'
    })
  }
})

export const selectUser = (state: RootState) => state.user

export default UserSlice.reducer