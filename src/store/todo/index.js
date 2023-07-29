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
    resetTodo: (state, _action) => {
      state.todos = null
      state.listId = null
      state.isLoading = false
    },
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

      state.todos.push({ title, id, detail, done })
    },
    mutateTodo: (state, action) => {
      const id = action.payload.id
      const idx = state.todos.findIndex(list => list.id === id)
      if (idx === -1) {
        return
      }

      state.todos[idx] = {
        ...state.todos[idx],
        ...action.payload,
      }
    },
    removeTodo: (state, action) => {
      const id = action.payload.id

      state.todos = state.todos.filter(list => list.id !== id)
    },
  },
})

export const {
  resetTodo,
  setTodos,
  setListId,
  setTodoIsLoading,
  addTodo,
  mutateTodo,
  removeTodo,
} = todoSlice.actions

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async ({ force = false } = {}, thunkApi) => {
    const listId = thunkApi.getState().list.current
    const currentListId = thunkApi.getState().todo.listId
    const isLoading = thunkApi.getState().todo.isLoading

    if (!force && (currentListId === listId || isLoading)) {
      return
    }

    thunkApi.dispatch(setTodoIsLoading(true))

    try {
      const res = await axios.get(`/lists/${listId}/tasks`)
      thunkApi.dispatch(setTodos(res.data.tasks || []))
      thunkApi.dispatch(setListId(listId))
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
    const listId = thunkApi.getState().list.current
    if (!listId) {
      return
    }

    try {
      const res = await axios.post(`/lists/${listId}/tasks`, payload)
      const id = res.data.id

      thunkApi.dispatch(
        addTodo({
          ...payload,
          id,
        }),
      )
    } catch (e) {
      handleThunkError(e, thunkApi)
    }
  },
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (payload, thunkApi) => {
    const listId = thunkApi.getState().list.current
    if (!listId) {
      return
    }

    const oldValue = thunkApi
      .getState()
      .todo.todos.find(todo => todo.id === payload.id)

    if (!oldValue) {
      return
    }

    try {
      await axios.put(`/lists/${listId}/tasks/${payload.id}`, {
        ...oldValue,
        ...payload,
      })
      thunkApi.dispatch(mutateTodo(payload))
    } catch (e) {
      handleThunkError(e, thunkApi)
    }
  },
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (payload, thunkApi) => {
    try {
      const listId = thunkApi.getState().list.current
      if (!listId) {
        return
      }

      await axios.delete(`/lists/${listId}/tasks/${payload.id}`)
      thunkApi.dispatch(removeTodo(payload))
    } catch (e) {
      handleThunkError(e, thunkApi)
    }
  },
)
