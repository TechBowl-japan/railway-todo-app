import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import './signIn.modules.css';
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
      <main className="signIn">
        <h1 className="signIn-title">ログイン</h1>
        <p className="error-message">{errorMessage}</p>
        <form className="signIn-form">
          <label className="email-label">
            メールアドレス
            <input type="email" className="email-input" onChange={handleEmailChange} />
          </label>

          <label className="password-label">
            パスワード
            <input type="password" className="password-input" onChange={handlePasswordChange} />
          </label>

          <button type="button" className="signIn-button" onClick={onSignIn}>
            ログインする
          </button>
        </form>
        <Link to="/signup" className="signUp-link">
          新規作成はこちら
        </Link>
      </main>
    </div>
  );
};
