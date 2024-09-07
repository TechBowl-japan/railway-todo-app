import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { url } from '../const';
import styles from './newList.module.css';

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
      <main className={styles.newList}>
        <h1 className={styles.newListTitle}>リスト新規作成</h1>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <form>
          <label htmlFor="taskListTitleInput" className={styles.titleInputLabel}>
            タイトル
          </label>
          <input
            type="text"
            id="taskListTitleInput"
            onChange={handleTitleChange}
            className={styles.taskListTitleInput}
          />
          <button type="button" onClick={onCreateList} className={styles.newListButton}>
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
