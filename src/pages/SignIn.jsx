import React, { useCallback, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '~/components/Header'
import { login } from '~/store/auth/index'
import { useSignup } from '~/hooks/useSignup'
import './signin.css'

export const SignIn = () => {
  const auth = useSelector(state => state.auth.token !== null)
  const dispatch = useDispatch()
  const { signup } = useSignup()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const handleEmailChange = e => setEmail(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const onSignIn = useCallback(() => {
    dispatch(login({ email, password })).catch(err => {
      setErrorMessage(`サインインに失敗しました: ${err.message}`)
    })
  }, [email, password, signup])

  if (auth) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form">
          <label className="email-label">メールアドレス</label>
          <br />
          <input
            type="email"
            className="email-input"
            onChange={handleEmailChange}
          />
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
            onChange={handlePasswordChange}
          />
          <br />
          <button type="button" className="signin-button" onClick={onSignIn}>
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  )
}
