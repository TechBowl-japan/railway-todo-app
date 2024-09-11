import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import styles from './signIn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../authSlice';
import { url } from '../const';

export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie('token', res.data.token);
        dispatch(signIn());
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <Header />
      <main className={styles.signIn}>
        <h1 className={styles.signInTitle}>ログイン</h1>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <form className={styles.signInForm}>
          <label htmlFor="email" className={styles.label}>
            メールアドレス
          </label>
          <input type="email" id="email" className={styles.input} onChange={handleEmailChange} />

          <label htmlFor="password" className={styles.label}>
            パスワード
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            onChange={handlePasswordChange}
          />

          <button type="button" className={styles.signInButton} onClick={onSignIn}>
            ログインする
          </button>
        </form>
        <Link to="/signup" className={styles.signUpLink}>
          新規作成はこちら
        </Link>
      </main>
    </div>
  );
};
