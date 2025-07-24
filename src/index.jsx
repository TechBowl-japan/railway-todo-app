import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import axios from "~/vendor/axios"
import App from "./App"
import { store } from "./store/index"

axios.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const root = document.getElementById("root")
createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
