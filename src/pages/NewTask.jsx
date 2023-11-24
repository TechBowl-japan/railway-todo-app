import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { url } from '../const';
import { Header } from '../components/Header';
import './newTask.scss';
import { useNavigate } from 'react-router-dom';

// NewTask コンポーネント
export const NewTask = () => {
  // 状態の初期化
  const [selectListId, setSelectListId] = useState();
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  // 期限
  const [deadline, setDeadline] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();
  const history = useNavigate();

  // イベントハンドラーの定義
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleSelectList = (id) => setSelectListId(id);
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  // タスク作成処理
  const onCreateTask = () => {
    const data = {
      title: title,
      detail: detail,
      done: false,
      deadline: deadline,
    };

    axios
      .post(`${url}/lists/${selectListId}/tasks`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        history('/');
      })
      .catch((err) => {
        setErrorMessage(`タスクの作成に失敗しました。${err}`);
      });
  };

  // ページロード時の処理
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
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // JSXを返す
  return (
    <div>
      <Header />
      <main className="new-task">
        <h2>タスク新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          {/* リストの選択 */}
          <label htmlFor="list">リスト</label>
          <br />
          <select
            onChange={(e) => handleSelectList(e.target.value)}
            className="new-task-select-list"
          >
            {lists.map((list, key) => (
              <option key={key} className="list-item" value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <br />

          {/* タイトルの入力 */}
          <label htmlFor="title">タイトル</label>
          <br />
          <input
            type="text"
            onChange={handleTitleChange}
            className="new-task-title"
          />
          <br />

          {/* 詳細の入力 */}
          <label>詳細</label>
          <p>期限：{deadline}</p>

          <br />
          <textarea
            type="text"
            id="textid"
            name="text"
            onChange={handleDetailChange}
            className="new-task-detail"
          />
          <br />

          <label htmlFor="deadline">期限：</label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            onChange={handleDeadlineChange}
          />

          {/* タスク作成ボタン */}
          <button
            type="button"
            className="new-task-button"
            onClick={onCreateTask}
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
