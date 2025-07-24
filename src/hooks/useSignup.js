import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signup } from "~/store/auth"

export const useSignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = useCallback(
    async ({ email, password, name }) => {
      await dispatch(
        signup({
          email,
          password,
          name,
        }),
      ).unwrap()
      navigate("/")
    },
    [dispatch, navigate],
  )

  return {
    signup: handleSignup,
  }
}
