import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../authSlice';
import { Header } from '../components/Header';
import { url } from '../const';
import './signUp.css';

// SignUp コンポーネント
export const SignUp = () => {
  // React RouterのナビゲーションフックとReduxの状態およびディスパッチの取得
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();

  // Stateの初期化
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessge] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log(cookies, removeCookie);

  // イベントハンドラーの定義
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // サインアップ処理
  const onSignUp = () => {
    const data = {
      email: email,
      name: name,
      password: password,
    };

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        // サインアップ成功時の処理
        const token = res.data.token;
        dispatch(signIn());
        setCookie('token', token);
        navigate('/');
      })
      .catch((err) => {
        // サインアップ失敗時のエラーメッセージ設定
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    // 認証済みの場合はホームページにリダイレクト
    if (auth) return <navigate to="/" />;
  };

  // JSXを返す
  return (
    <div>
      {/* ヘッダーコンポーネントの表示 */}
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        {/* エラーメッセージの表示 */}
        <p className="error-message">{errorMessage}</p>
        {/* サインアップフォーム */}
        <form className="signup-form">
          <label htmlFor="emailid">メールアドレス</label>
          <br />
          <input
            type="email"
            id="emailid"
            name="email"
            onChange={handleEmailChange}
            className="email-input"
            autoComplete="email" // メールアドレスの入力欄なので email を指定
          />
          <br />
          <label htmlFor="textid">ユーザ名</label>
          <br />
          <input
            type="text"
            id="textid"
            name="text"
            onChange={handleNameChange}
            className="name-input"
            autoComplete="username"
          />
          <br />
          <label htmlFor="passid">パスワード</label>
          <br />
          <input
            type="password"
            id="passid"
            name="password"
            onChange={handlePasswordChange}
            className="password-input"
            autoComplete="new-password"
          />
          <br />
          <button type="button" onClick={onSignUp} className="signup-button">
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
