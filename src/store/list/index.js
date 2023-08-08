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
    resetList: (state, _action) => {
      state.lists = null
      state.current = null
      state.isLoading = false
    },
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

      if (state.current === id) {
        state.current = state.lists[0]?.id || null
      }
    },
    mutateList: (state, action) => {
      const id = action.payload.id
      const title = action.payload.title

      state.lists = state.lists.map(list => {
        if (list.id === id) {
          list.title = title
        }

        return list
      })
    },
  },
})

export const {
  resetList,
  setList,
  setCurrentList,
  setListIsLoading,
  addList,
  removeList,
  mutateList,
} = listSlice.actions

export const fetchLists = createAsyncThunk(
  'list/fetchLists',
  async ({ force = false } = {}, thunkApi) => {
    const isLoading = thunkApi.getState().list.isLoading

    if (!force && (thunkApi.getState().list.lists || isLoading)) {
      return
    }

    if (thunkApi.getState().auth.token === null) {
      return
    }

    thunkApi.dispatch(setListIsLoading(true))

    try {
      const res = await axios.get('/lists')
      thunkApi.dispatch(setList(res.data))
    } catch (e) {
      return handleThunkError(e, thunkApi)
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

      return res.data.id
    } catch (e) {
      return handleThunkError(e, thunkApi)
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
      return handleThunkError(e, thunkApi)
    }
  },
)

export const updateList = createAsyncThunk(
  'list/updateList',
  async ({ id, title }, thunkApi) => {
    try {
      await axios.put(`/lists/${id}`, { title })
      thunkApi.dispatch(mutateList({ id, title }))
    } catch (e) {
      return handleThunkError(e, thunkApi)
    }
  },
)
