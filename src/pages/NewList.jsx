import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { url } from '../const';
import './newList.css';

// NewList コンポーネント
export const NewList = () => {
  // Stateの初期化
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // イベントハンドラーの定義
  const handleTitleChange = (e) => setTitle(e.target.value);

  // リストの作成
  const onCreateList = () => {
    const data = {
      title: title,
    };

    // リストの作成APIへのリクエスト
    axios
      .post(`${url}/lists`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        // リストの作成が成功した場合、ホーム画面に遷移
        navigate('/');
      })
      .catch((err) => {
        // エラーが発生した場合、エラーメッセージを設定
        setErrorMessage(`リストの作成に失敗しました。${err}`);
      });
  };

  // JSXを返す
  return (
    <div>
      {/* ヘッダーコンポーネントの表示 */}
      <Header />
      <main className="new-list">
        <h2>リスト新規作成</h2>
        {/* エラーメッセージの表示 */}
        <p className="error-message">{errorMessage}</p>
        <form className="new-list-form">
          {/* タイトルの入力フィールド */}
          <label htmlFor="title">タイトル</label>
          <br />
          <input
            type="text"
            id="textid"
            name="text"
            onChange={handleTitleChange}
            className="new-list-title"
          />
          <br />
          {/* リスト作成ボタン */}
          <button
            type="button"
            onClick={onCreateList}
            className="new-list-button"
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
