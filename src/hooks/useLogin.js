import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '~/store/auth'

export const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async ({ email, password }) => {
      await dispatch(
        login({
          email,
          password,
        }),
      ).unwrap()

      navigate('/')
    },
    [useDispatch],
  )

  return {
    login: handleLogin,
  }
}
