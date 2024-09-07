import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { url } from '../const';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './editTask.module.css';
import { convertToDisplayDate, formatDateToISO } from '../utils/dateUtils';

export const EditTask = () => {
  const navigation = useNavigate();
  const { listId, taskId } = useParams();
  const [cookies] = useCookies();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [limit, setLimit] = useState('');
  const [isDone, setIsDone] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleIsDoneChange = (e) => setIsDone(e.target.value === 'done');
  const handleLimitChange = (date) => setLimit(date.target.value);

  const onUpdateTask = () => {
    console.log(isDone);
    const data = {
      title: title,
      detail: detail,
      done: isDone,
      limit: formatDateToISO(limit),
    };

    axios
      .put(`${url}/lists/${listId}/tasks/${taskId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。${err}`);
      });
  };

  const onDeleteTask = () => {
    axios
      .delete(`${url}/lists/${listId}/tasks/${taskId}`, {
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
      .get(`${url}/lists/${listId}/tasks/${taskId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const task = res.data;
        setTitle(task.title);
        setDetail(task.detail);
        setIsDone(task.done);
        setLimit(convertToDisplayDate(task.limit));
      })
      .catch((err) => {
        setErrorMessage(`タスク情報の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className={styles.editTask}>
        <h1 className={styles.editMainTitle}>タスク編集</h1>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <form>
          <label className={styles.editTitleLabel}>タイトル</label>
          <input
            type="text"
            onChange={handleTitleChange}
            className={styles.editTaskTitle}
            value={title}
          />
          <label htmlFor="edit-detail-label" className={styles.editDetailLabel}>
            詳細
          </label>
          <textarea
            type="text"
            id="edit-detail-label"
            onChange={handleDetailChange}
            className={styles.editTaskDetail}
            value={detail}
          />
          <label htmlFor="edit-limit-label" className={styles.editLimitLabel}>
            期限
          </label>
          <input
            type="datetime-local"
            id="edit-limit-label"
            name="limit"
            value={limit}
            onChange={handleLimitChange}
            className={styles.editTaskLimit}
          />
          <div>
            <input
              type="radio"
              id="todo"
              name="status"
              value="todo"
              onChange={handleIsDoneChange}
              checked={isDone === false ? 'checked' : ''}
              className={styles.NotCompletionSelect}
            />
            未完了
            <input
              type="radio"
              id="done"
              name="status"
              value="done"
              onChange={handleIsDoneChange}
              checked={isDone === true ? 'checked' : ''}
              className={styles.completionSelect}
            />
            完了
          </div>
          <button type="button" className={styles.deleteTaskButton} onClick={onDeleteTask}>
            削除
          </button>
          <button type="button" className={styles.editTaskButton} onClick={onUpdateTask}>
            更新
          </button>
        </form>
      </main>
    </div>
  );
};
