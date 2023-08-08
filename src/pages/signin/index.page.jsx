import React, { useCallback, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLogin } from '~/hooks/useLogin'
import { useId } from '~/hooks/useId'
import './index.css'

const SignIn = () => {
  const auth = useSelector(state => state.auth.token !== null)
  const { login } = useLogin()

  const id = useId()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = useCallback(
    event => {
      event.preventDefault()

      setIsSubmitting(true)

      login({ email, password })
        .catch(err => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    },
    [email, password],
  )

  if (auth) {
    return <Redirect to="/" />
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
            value={email}
            onChange={event => setEmail(event.target.value)}
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
            value={password}
            onChange={event => setPassword(event.target.value)}
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
