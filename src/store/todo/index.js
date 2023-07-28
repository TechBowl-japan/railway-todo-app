import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkError } from '~/utils/handleThunkError'
import axios from '~/vendor/axios'

const initialState = {
  todos: null,
  listId: null,
  isLoading: false,
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    setListId: (state, action) => {
      state.listId = action.payload
    },
    setTodoIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    addTodo: (state, action) => {
      const title = action.payload.title
      const id = action.payload.id
      const detail = action.payload.detail
      const done = action.payload.done

      state.lists.push({ title, id, detail, done })
    },
    mutateTodo: (state, action) => {
      const title = action.payload.title
      const id = action.payload.id
      const detail = action.payload.detail
      const done = action.payload.done

      const idx = state.lists.findIndex(list => list.id === id)
      state.lists[idx] = { title, id, detail, done }
    },
    removeTodo: (state, action) => {
      const id = action.payload.id

      state.lists = state.lists.filter(list => list.id !== id)
    },
  },
})

export const {
  setTodos,
  setListId,
  setTodoIsLoading,
  addTodo,
  mutateTodo,
  removeTodo,
} = listSlice.actions

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async ({ force = false } = {}, thunkApi) => {
    const listId = thunkApi.getState().list.current
    const currentListId = thunkApi.getState().todo.listId

    if (!force && currentListId === listId) {
      return
    }

    thunkApi.dispatch(setTodoIsLoading(true))

    try {
      const res = await axios.get(`/lists/${listId}/tasks`)
      thunkApi.dispatch(setTodos(res.data.tasks))
    } catch (e) {
      handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setTodoIsLoading(false))
    }
  },
)

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setTodoIsLoading(true))

    try {
      await axios.post(`/lists/${payload.listId}/tasks`, payload)
      thunkApi.dispatch(addTodo(payload))
    } catch (e) {
      handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setTodoIsLoading(false))
    }
  },
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setTodoIsLoading(true))

    try {
      await axios.put(`/lists/${payload.listId}/tasks/${payload.id}`, payload)
      thunkApi.dispatch(mutateTodo(payload))
    } catch (e) {
      handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setTodoIsLoading(false))
    }
  },
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setTodoIsLoading(true))

    try {
      await axios.delete(`/lists/${payload.listId}/tasks/${payload.id}`)
      thunkApi.dispatch(removeTodo(payload))
    } catch (e) {
      handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setTodoIsLoading(false))
    }
  },
)
