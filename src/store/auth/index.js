import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '~/vendor/axios'
import { handleThunkError } from '~/utils/handleThunkError'
import { resetTask } from '~/store/task'
import { resetList } from '~/store/list'

const initialState = {
  // NOTE: localStorageから直接取得している。SSR時にはこのままでは動かないので注意
  token: localStorage.getItem('railway-todo-app__token') || null,
  user: null,
  // NOTE: 2重ロードの回避用
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setToken, setUserIsLoading, setUser } = authSlice.actions

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async ({ force = false } = {}, thunkApi) => {
    const isLoading = thunkApi.getState().auth.isLoading
    const hasUser = thunkApi.getState().auth.user !== null

    if (!force && (isLoading || hasUser)) {
      return
    }

    if (thunkApi.getState().auth.token === null) {
      return
    }

    thunkApi.dispatch(setUserIsLoading(true))

    try {
      const response = await axios.get(`/users`)
      thunkApi.dispatch(setUser(response.data))
    } catch (e) {
      return handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setUserIsLoading(false))
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

    // 他のステートをリセット
    thunkApi.dispatch(resetTask())
    thunkApi.dispatch(resetList())
  },
)
