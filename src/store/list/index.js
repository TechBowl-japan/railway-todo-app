import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkError } from '~/utils/handleThunkError'
import axios from '~/vendor/axios'

const initialState = {
  lists: null,
  current: null,
  isLoading: false,
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.lists = action.payload

      if (action.payload.length > 0) {
        state.current = action.payload[0].id
      } else {
        state.current = null
      }
    },
    setCurrentList: (state, action) => {
      state.current = action.payload
    },
    setListIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    addList: (state, action) => {
      const title = action.payload.title
      const id = action.payload.id

      state.lists.push({ title, id })
    },
    removeList: (state, action) => {
      const id = action.payload.id

      state.lists = state.lists.filter(list => list.id !== id)
    },
  },
})

export const {
  setList,
  setCurrentList,
  setListIsLoading,
  addList,
  removeList,
} = listSlice.actions

export const fetchLists = createAsyncThunk(
  'list/fetchLists',
  async ({ force = false } = {}, thunkApi) => {
    if (!force && thunkApi.getState().list.lists) {
      return
    }

    thunkApi.dispatch(setListIsLoading(true))

    try {
      const res = await axios.get('/lists')
      thunkApi.dispatch(setList(res.data))
    } catch (e) {
      handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setListIsLoading(false))
    }
  },
)

export const createList = createAsyncThunk(
  'list/createList',
  async ({ title }, thunkApi) => {
    try {
      const res = await axios.post('/lists', { title })
      thunkApi.dispatch(addList(res.data))
    } catch (e) {
      handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setListIsLoading(false))
    }
  },
)

export const deleteList = createAsyncThunk(
  'list/deleteList',
  async ({ id }, thunkApi) => {
    try {
      await axios.delete(`/lists/${id}`)
      thunkApi.dispatch(removeList({ id }))
    } catch (e) {
      handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setListIsLoading(false))
    }
  },
)
