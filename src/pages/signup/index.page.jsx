import React, { useCallback, useId, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './index.css'
import { useSignup } from '~/hooks/useSignup'

const SignUp = () => {
  const auth = useSelector(state => state.auth.token !== null)

  const id = useId()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { signup } = useSignup()

  const onSubmit = useCallback(
    event => {
      event.preventDefault()

      setIsSubmitting(true)

      const email = event.target.elements[`${id}-email`].value
      const password = event.target.elements[`${id}-password`].value
      const name = event.target.elements[`${id}-name`].value

      signup({ email, name, password })
        .catch(err => {
          setErrorMessage(`サインインに失敗しました: ${err.message}`)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    },
    [id],
  )

  if (auth) {
    return <Navigate to="/" />
  }

  return (
    <main className="signup">
      <h2 className="signup__title">Register</h2>
      <p className="signup__error">{errorMessage}</p>
      <form className="signup__form" onSubmit={onSubmit}>
        <fieldset className="signup__form_field">
          <label htmlFor={`${id}-email`} className="signup__form_label">
            E-mail Address
          </label>
          <input id={`${id}-email`} className="app_input" />
        </fieldset>
        <fieldset className="signup__form_field">
          <label htmlFor={`${id}-name`} className="signup__form_label">
            Username
          </label>
          <input id={`${id}-name`} type="text" className="app_input" />
        </fieldset>
        <fieldset className="signup__form_field">
          <label htmlFor={`${id}-password`} className="signup__form_label">
            Password
          </label>
          <input id={`${id}-password`} type="password" className="app_input" />
        </fieldset>
        <div className="signup__form_actions">
          <Link className="app_button" data-variant="secondary" to="/signin">
            Login
          </Link>
          <div className="signup__form_actions_spacer"></div>
          <button type="submit" className="app_button" disabled={isSubmitting}>
            Register
          </button>
        </div>
      </form>
    </main>
  )
}

export default SignUp
