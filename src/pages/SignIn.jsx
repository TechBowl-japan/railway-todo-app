import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import './signin.css';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../authSlice';
import { url } from '../const';

// SignIn コンポーネント
export const SignIn = () => {
  // Reduxの状態とディスパッチの取得
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Stateの初期化
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log(cookies, removeCookie);

  // イベントハンドラーの定義
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // サインイン処理
  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        // サインイン成功時の処理
        setCookie('token', res.data.token);
        dispatch(signIn());
        navigate.push('/');
      })
      .catch((err) => {
        // サインイン失敗時のエラーメッセージ設定
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  // 認証済みの場合はホームページにリダイレクト
  if (auth) return <navigate replace to="/" />;

  // JSXを返す
  return (
    <div>
      {/* ヘッダーコンポーネントの表示 */}
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        {/* エラーメッセージの表示 */}
        <p className="error-message">{errorMessage}</p>
        {/* サインインフォーム */}
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
        {/* 新規作成へのリンク */}
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};
