import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/index'
import { listSlice } from './list/index'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    list: listSlice.reducer,
  },
})
