import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { signup } from "~/store/auth"

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
      history.push("/")
    },
    [dispatch, history.push],
  )

  return {
    signup: handleSignup,
  }
}
