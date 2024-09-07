import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { url } from '../const';
import './newList.modules.css';

export const NewList = () => {
  const [cookies] = useCookies();
  const navigation = useNavigate();
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleTitleChange = (e) => setTitle(e.target.value);
  const onCreateList = () => {
    const data = {
      title: title,
    };

    axios
      .post(`${url}/lists`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`リストの作成に失敗しました。${err}`);
      });
  };

  return (
    <div>
      <Header />
      <main className="new-list">
        <h1 className="new-list-title">リスト新規作成</h1>
        <p className="error-message">{errorMessage}</p>
        <form>
          <label className="title-input-label">タイトル</label>
          <input type="text" onChange={handleTitleChange} className="taskList-title-input" />
          <button type="button" onClick={onCreateList} className="new-list-button">
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
