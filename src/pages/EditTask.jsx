import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { url } from '../const';
import { useNavigate, useParams } from 'react-router-dom';
import './editTask.css';

// EditTask コンポーネント
export const EditTask = () => {
  // React RouterのナビゲーションフックとURLパラメータの取得
  const navigate = useNavigate();
  const { listId, taskId } = useParams();

  // Cookieフックを使用してクッキーの取得
  const [cookies] = useCookies();

  // Stateの初期化
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [isDone, setIsDone] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  // イベントハンドラーの定義
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleIsDoneChange = (e) => setIsDone(e.target.value === 'done');

  // タスクの更新処理
  const onUpdateTask = () => {
    console.log(isDone);
    const data = {
      title: title,
      detail: detail,
      done: isDone,
    };

    axios
      .put(`${url}/lists/${listId}/tasks/${taskId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。${err}`);
      });
  };

  // タスクの削除処理
  const onDeleteTask = () => {
    axios
      .delete(`${url}/lists/${listId}/tasks/${taskId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`削除に失敗しました。${err}`);
      });
  };

  // タスク情報の取得処理
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
      })
      .catch((err) => {
        setErrorMessage(`タスク情報の取得に失敗しました。${err}`);
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // JSXを返す
  return (
    <div>
      {/* ヘッダーコンポーネントの表示 */}
      <Header />
      <main className="edit-task">
        <h2>タスク編集</h2>
        {/* エラーメッセージの表示 */}
        <p className="error-message">{errorMessage}</p>
        {/* タスク編集フォーム */}
        <form className="edit-task-form">
          <label>タイトル</label>
          <br />
          {/* タイトルの入力欄 */}
          <input
            type="text"
            id="textid"
            name="text"
            onChange={handleTitleChange}
            className="edit-task-title"
            value={title}
          />
          <br />
          <label>詳細</label>
          <br />
          {/* 詳細の入力欄 */}
          <textarea
            type="text"
            id="textid"
            name="text"
            onChange={handleDetailChange}
            className="edit-task-detail"
            value={detail}
          />
          <br />
          <div>
            {/* タスクの状態ラジオボタン */}
            <input
              type="radio"
              id="todo"
              name="status"
              value="todo"
              onChange={handleIsDoneChange}
              checked={isDone === false}
            />
            未完了
            <input
              type="radio"
              id="done"
              name="status"
              value="done"
              onChange={handleIsDoneChange}
              checked={isDone === true}
            />
            完了
          </div>
          {/* タスク削除ボタン */}
          <button
            type="button"
            className="delete-task-button"
            onClick={onDeleteTask}
          >
            削除
          </button>
          {/* タスク更新ボタン */}
          <button
            type="button"
            className="edit-task-button"
            onClick={onUpdateTask}
          >
            更新
          </button>
        </form>
      </main>
    </div>
  );
};
