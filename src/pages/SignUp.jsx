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
  // eslint-disable-next-line no-unused-vars
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
        navigate('/', { replace: true });
      })
      .catch((err) => {
        // サインアップ失敗時のエラーメッセージ設定
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    // 認証済みの場合はホームページにリダイレクト
    if (auth) {
      navigate('/', { replace: true });
      return; // または何も返さないか、適切なコンポーネントを返す
    }
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
            <label>メールアドレス</label>
            <br />
            {/* メールアドレスの入力欄 */}
            <input
              type="email"
              onChange={handleEmailChange}
              className="email-input"
            />
            <br />
            <label>ユーザ名</label>
            <br />
            {/* ユーザ名の入力欄 */}
            <input
              type="text"
              onChange={handleNameChange}
              className="name-input"
            />
            <br />
            <label>パスワード</label>
            <br />
            {/* パスワードの入力欄 */}
            <input
              type="password"
              onChange={handlePasswordChange}
              className="password-input"
            />
            <br />
            {/* サインアップボタン */}
            <button type="button" onClick={onSignUp} className="signup-button">
              作成
            </button>
          </form>
        </main>
      </div>
    );
  };
};
