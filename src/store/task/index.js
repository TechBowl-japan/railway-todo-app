import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkError } from '~/utils/handleThunkError'
import axios from '~/vendor/axios'

const initialState = {
  tasks: null,
  listId: null,
  isLoading: false,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetTask: (state, _action) => {
      state.tasks = null
      state.listId = null
      state.isLoading = false
    },
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    setListId: (state, action) => {
      state.listId = action.payload
    },
    setTaskIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    addTask: (state, action) => {
      const title = action.payload.title
      const id = action.payload.id
      const detail = action.payload.detail
      const done = action.payload.done

      state.tasks.push({ title, id, detail, done })
    },
    mutateTask: (state, action) => {
      const id = action.payload.id
      const idx = state.tasks.findIndex(list => list.id === id)
      if (idx === -1) {
        return
      }

      state.tasks[idx] = {
        ...state.tasks[idx],
        ...action.payload,
      }
    },
    removeTask: (state, action) => {
      const id = action.payload.id

      state.tasks = state.tasks.filter(list => list.id !== id)
    },
  },
})

export const {
  resetTask,
  setTasks,
  setListId,
  setTaskIsLoading,
  addTask,
  mutateTask,
  removeTask,
} = taskSlice.actions

export const fetchTasks = createAsyncThunk(
  'task/fetchTasks',
  async ({ force = false } = {}, thunkApi) => {
    const listId = thunkApi.getState().list.current
    const currentListId = thunkApi.getState().task.listId
    const isLoading = thunkApi.getState().task.isLoading

    if (!force && (currentListId === listId || isLoading)) {
      return
    }

    if (thunkApi.getState().auth.token === null) {
      return
    }

    thunkApi.dispatch(setTaskIsLoading(true))

    try {
      const res = await axios.get(`/lists/${listId}/tasks`)
      thunkApi.dispatch(setTasks(res.data.tasks || []))
      thunkApi.dispatch(setListId(listId))
    } catch (e) {
      handleThunkError(e, thunkApi)
    } finally {
      thunkApi.dispatch(setTaskIsLoading(false))
    }
  },
)

export const createTask = createAsyncThunk(
  'task/createTask',
  async (payload, thunkApi) => {
    const listId = thunkApi.getState().list.current
    if (!listId) {
      return
    }

    try {
      const res = await axios.post(`/lists/${listId}/tasks`, payload)
      const id = res.data.id

      thunkApi.dispatch(
        addTask({
          ...payload,
          id,
        }),
      )
    } catch (e) {
      handleThunkError(e, thunkApi)
    }
  },
)

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (payload, thunkApi) => {
    const listId = thunkApi.getState().list.current
    if (!listId) {
      return
    }

    const oldValue = thunkApi
      .getState()
      .task.tasks.find(task => task.id === payload.id)

    if (!oldValue) {
      return
    }

    try {
      await axios.put(`/lists/${listId}/tasks/${payload.id}`, {
        ...oldValue,
        ...payload,
      })
      thunkApi.dispatch(mutateTask(payload))
    } catch (e) {
      handleThunkError(e, thunkApi)
    }
  },
)

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (payload, thunkApi) => {
    try {
      const listId = thunkApi.getState().list.current
      if (!listId) {
        return
      }

      await axios.delete(`/lists/${listId}/tasks/${payload.id}`)
      thunkApi.dispatch(removeTask(payload))
    } catch (e) {
      handleThunkError(e, thunkApi)
    }
  },
)
