import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '~/store/auth'

export const useSignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = useCallback(
    ({ email, password, name }) => {
      dispatch(
        signup({
          email,
          password,
          name,
        }),
      )
      navigate('/')
    },
    [useDispatch],
  )

  return {
    signup: handleSignup,
  }
}
