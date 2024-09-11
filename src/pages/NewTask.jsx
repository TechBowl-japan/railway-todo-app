import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { url } from '../const';
import { Header } from '../components/Header';
import styles from './newTask.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDateToISO } from '../utils/dateUtils';

export const NewTask = () => {
  const [selectListId, setSelectListId] = useState();
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [limit, setLimit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();
  const navigation = useNavigate();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleSelectList = (id) => setSelectListId(id);
  const handleLimitChange = (date) => setLimit(date.target.value);

  const onCreateTask = () => {
    const data = {
      title: title,
      detail: detail,
      done: false,
      limit: formatDateToISO(limit),
    };

    axios
      .post(`${url}/lists/${selectListId}/tasks`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`タスクの作成に失敗しました。${err}`);
      });
    console.log(data);
  };

  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
        setSelectListId(res.data[0]?.id);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className={styles.newTask}>
        <h1 className={styles.newTaskTitle}>タスク新規作成</h1>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <form>
          <label htmlFor="taskListSelect" className={styles.label}>
            リスト
          </label>
          <select
            onChange={(e) => handleSelectList(e.target.value)}
            className={styles.input}
            id="taskListSelect"
          >
            {lists.map((list, key) => (
              <option key={key} className={styles.listItem} value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <label htmlFor="title" className={styles.label}>
            タイトル
          </label>
          <input type="text" id="title" onChange={handleTitleChange} className={styles.input} />
          <label className={styles.label} id="detail">
            詳細
          </label>
          <textarea
            type="text"
            id="detail"
            onChange={handleDetailChange}
            className={styles.input}
          />
          <label htmlFor="limit" className={styles.label}>
            期限
          </label>
          <input
            type="datetime-local"
            id="limit"
            name="limit"
            className={styles.input}
            onChange={handleLimitChange}
          />
          <button type="button" className={styles.newTaskButton} onClick={onCreateTask}>
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
