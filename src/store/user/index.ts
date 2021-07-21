import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { EUser } from "../../constants/EMessage"
import UserRepository from "../../repository/UserRepository"
import { RootState } from "../store"

export interface UserState {
  status: 'Idle' | 'Loading' | 'Failed',
  token: string | null,
  isAuthenticated: boolean
}

const TOKEN = 'TOKEN'

const initialState = (): UserState => {
  const token = localStorage.getItem(TOKEN)
  if (token) {
    return {
      status: 'Idle',
      token,
      isAuthenticated: true
    }
  }
  return {
    status: 'Idle',
    token: null,
    isAuthenticated: false
  }
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

export const doLogin = createAsyncThunk('user/login', 
  async ( user: { name: string, password: string}) => {
    const repository = new UserRepository()
    try {
     const token = await repository.logIn(user.name, user.password)
     toast.success(EUser.SUCCESS_LOGIN, {
      position: 'bottom-right',
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    })
    return token
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
  initialState: initialState(),
  reducers: {
    logOut(state) {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem(TOKEN)
    }
  },
  extraReducers: (builder) => {
    //doSignUp
    builder.addCase(doSignUp.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(doSignUp.rejected, (state) => {
      state.status = 'Failed'
    })
    builder.addCase(doSignUp.fulfilled, (state) => {
      state.status = 'Idle'
    })

    //doLogin
    builder.addCase(doLogin.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(doLogin.rejected, (state) => {
      state.status = 'Failed'
      state.token = null
      state.isAuthenticated = false
    })
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.status = 'Idle'
      state.token = action.payload
      state.isAuthenticated = false
      localStorage.setItem(TOKEN, action.payload)
    })
  }
})

export const selectUser = (state: RootState) => state.user

export const { logOut } = UserSlice.actions

export default UserSlice.reducer