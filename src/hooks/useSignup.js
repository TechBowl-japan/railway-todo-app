import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { signup } from '~/store/auth'

export const useSignup = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSignup = useCallback(
    async ({ email, password, name }) => {
      await dispatch(
        signup({
          email,
          password,
          name,
        }),
      ).unwrap()
      history.push('/')
    },
    [useDispatch],
  )

  return {
    signup: handleSignup,
  }
}
