import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '~/vendor/axios'

const initialState = {
  token: localStorage.getItem('railway-todo-app__token') || null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setToken, setUser } = authSlice.actions

const handleThunkError = (e, thunkApi) => {
  let errorMessage = 'Something went wrong'
  if (e && e.response && e.response.data && e.response.data.ErrorMessageEN) {
    errorMessage = e.response.data.ErrorMessageEN
  } else if (e && e.message) {
    errorMessage = e.message
  }

  return thunkApi.rejectWithValue({
    message: errorMessage,
  })
}

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_payload, thunkApi) => {
    if (thunkApi.getState().auth.token === null) {
      return
    }

    try {
      const response = await axios.get(`/users`)
      thunkApi.dispatch(setUser(response.data))
    } catch (e) {
      return handleThunkError(e, thunkApi)
    }
  },
)

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkApi) => {
    try {
      const { email, password } = payload
      const response = await axios.post(`/signin`, {
        email,
        password,
      })

      localStorage.setItem('railway-todo-app__token', response.data.token)
      thunkApi.dispatch(setToken(response.data.token))
      void thunkApi.dispatch(fetchUser())
    } catch (e) {
      return handleThunkError(e, thunkApi)
    }
  },
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (payload, thunkApi) => {
    try {
      const { email, password, name } = payload
      const response = await axios.post(`/users`, {
        email,
        password,
        name,
      })
      thunkApi.dispatch(setToken(response.data.token))
      void thunkApi.dispatch(fetchUser())
    } catch (e) {
      return handleThunkError(e, thunkApi)
    }
  },
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_payload, thunkApi) => {
    // NOTE: ログアウト用のAPIは用意されてないので、トークンを削除するだけ
    localStorage.removeItem('railway-todo-app__token')
    thunkApi.dispatch(setToken(null))
    thunkApi.dispatch(setUser(null))
  },
)
