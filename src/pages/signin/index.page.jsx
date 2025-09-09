import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { useId } from "~/hooks/useId"
import { useLogin } from "~/hooks/useLogin"
import "./index.css"
import { Button } from "~/components/Button"
import { Input } from "~/components/Input"

const SignIn = () => {
  const auth = useSelector((state) => state.auth.token !== null)
  const { login } = useLogin()

  const id = useId()
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setIsSubmitting(true)

      login({ email, password })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    },
    [email, password, login],
  )

  if (auth) {
    return <Navigate replace to="/" />
  }

  return (
    <main className="signin">
      <h2 className="signin__title">Login</h2>
      <p className="signin__error">{errorMessage}</p>
      <form className="signin__form" onSubmit={onSubmit}>
        <fieldset className="signin__form_field">
          <label htmlFor={`${id}-email`} className="signin__form_label">
            E-mail Address
          </label>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </fieldset>
        <fieldset className="signin__form_field">
          <label htmlFor={`${id}-password`} className="signin__form_label">
            Password
          </label>
          <Input
            id={`${id}-password`}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </fieldset>
        <div className="signin__form_actions">
          <Link className="app_button" data-variant="secondary" to="/signup">
            Register
          </Link>
          <div className="signin__form_actions_spacer"></div>
          <Button disabled={isSubmitting}>Login</Button>
        </div>
      </form>
    </main>
  )
}

export default SignIn
