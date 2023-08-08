import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from '~/store/auth'

export const useLogin = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = useCallback(
    async ({ email, password }) => {
      await dispatch(
        login({
          email,
          password,
        }),
      ).unwrap()

      history.push('/')
    },
    [useDispatch],
  )

  return {
    login: handleLogin,
  }
}
