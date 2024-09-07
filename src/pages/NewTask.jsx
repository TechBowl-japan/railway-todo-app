import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { url } from '../const';
import { Header } from '../components/Header';
import './newTask.modules.css';
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
      <main className="new-task">
        <h1 className="new-task-title">タスク新規作成</h1>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          <label htmlFor="taskListSelect" className="task-select-list-label">
            リスト
          </label>
          <select
            onChange={(e) => handleSelectList(e.target.value)}
            className="new-task-select-list"
            id="taskListSelect"
          >
            {lists.map((list, key) => (
              <option key={key} className="list-item" value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <label htmlFor="title" className="title-input-label">
            タイトル
          </label>
          <input type="text" id="title" onChange={handleTitleChange} className="task-title-input" />
          <label className="detail-input-label" id="detail">
            詳細
          </label>
          <textarea
            type="text"
            id="detail"
            onChange={handleDetailChange}
            className="task-detail-input"
          />
          <label htmlFor="limit" className="limit-input-label">
            期限
          </label>
          <input
            type="datetime-local"
            id="limit"
            name="limit"
            className="task-limit-input"
            onChange={handleLimitChange}
          />
          <button type="button" className="new-task-button" onClick={onCreateTask}>
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
