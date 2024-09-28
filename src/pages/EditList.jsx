import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { url } from '../const';
import styles from './editList.module.css';

export const EditList = () => {
  const navigation = useNavigate();
  const { listId } = useParams();
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const onUpdateList = () => {
    const data = {
      title: title,
    };

    axios
      .put(`${url}/lists/${listId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。 ${err}`);
      });
  };

  const onDeleteList = () => {
    axios
      .delete(`${url}/lists/${listId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`削除に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/lists/${listId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const list = res.data;
        setTitle(list.title);
      })
      .catch((err) => {
        setErrorMessage(`リスト情報の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className={styles.editList}>
        <h1 className={styles.editMainTitle}>リスト編集</h1>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <form>
          <label htmlFor="editListTitle" className={styles.editListTitleLabel}>
            タイトル
          </label>
          <input
            type="text"
            id="editListTitle"
            className={styles.editListTitle}
            value={title}
            onChange={handleTitleChange}
          />
          <button type="button" className={styles.deleteListButton} onClick={onDeleteList}>
            削除
          </button>
          <button type="button" className={styles.editListButton} onClick={onUpdateList}>
            更新
          </button>
        </form>
      </main>
    </div>
  );
};
