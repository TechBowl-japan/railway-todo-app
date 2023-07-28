import React, { useCallback, useId, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLogin } from '~/hooks/useLogin'
import './index.css'

const SignIn = () => {
  const auth = useSelector((state) => state.auth.token !== null)
  const { login } = useLogin()

  const id = useId()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setIsSubmitting(true)

      const email = event.target.elements[`${id}-email`].value
      const password = event.target.elements[`${id}-password`].value

      login({ email, password })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    },
    [id]
  )

  if (auth) {
    return <Navigate to="/" />
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
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            className="app_input"
          />
        </fieldset>
        <fieldset className="signin__form_field">
          <label htmlFor={`${id}-password`} className="signin__form_label">
            Password
          </label>
          <input
            id={`${id}-password`}
            type="password"
            autoComplete="current-password"
            className="app_input"
          />
        </fieldset>
        <div className="signin__form_actions">
          <Link className="app_button" data-variant="secondary" to="/signup">
            Register
          </Link>
          <div className="signin__form_actions_spacer"></div>
          <button type="submit" className="app_button" disabled={isSubmitting}>
            Login
          </button>
        </div>
      </form>
    </main>
  )
}

export default SignIn