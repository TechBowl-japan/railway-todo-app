import axios from 'axios'

const axiosInstnace = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstnace.interceptors.response.use(
  response => response,
  err => {
    // 401を返す場合はトークンを飛ばしてログイン画面に遷移
    if (err && err.response && err.response.status === 401) {
      localStorage.removeItem('railway-todo-app__token')
      location.href = '/signin'
    }

    return Promise.reject(err)
  },
)

export default axiosInstnace
