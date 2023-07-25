import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/index'
import axios from '~/vendor/axios'

axios.interceptors.request.use(config => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
