import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { url } from '../const';
import styles from './home.module.css';
import Tasks from '../components/Tasks';

export const Home = () => {
  const [isDoneDisplay, setIsDoneDisplay] = useState(false); // false->未完了 true->完了
  const [lists, setLists] = useState([]);
  const [selectListId, setSelectListId] = useState();
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();

  const handleIsDoneDisplayChange = (e) => setIsDoneDisplay(e.target.value === 'done');

  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);

  useEffect(() => {
    const listId = lists[0]?.id;
    if (typeof listId !== 'undefined') {
      setSelectListId(listId);
      axios
        .get(`${url}/lists/${listId}/tasks`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setTasks(res.data.tasks);
        })
        .catch((err) => {
          setErrorMessage(`タスクの取得に失敗しました。${err}`);
        });
    }
  }, [lists]);

  const handleSelectList = (id) => {
    setSelectListId(id);
    axios
      .get(`${url}/lists/${id}/tasks`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      });
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSelectList(id);
    }
  };

  return (
    <div>
      <Header />
      <main className={styles.taskList}>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <div>
          <div className={styles.listHeader}>
            <h1 className={styles.listMainTitle}>リスト一覧</h1>
            <div className={styles.listMenu}>
              <p>
                <Link to="/list/new">リスト新規作成</Link>
              </p>
              <p>
                <Link to={`/lists/${selectListId}/edit`}>選択中のリストを編集</Link>
              </p>
            </div>
          </div>
          <ul role="tablist" aria-label="リストタブ" className={styles.listTab}>
            {lists.map((list) => {
              const isActive = list.id === selectListId;
              return (
                <li
                  key={list.id}
                  role="tab"
                  id={list.id}
                  tabIndex={0}
                  aria-selected={isActive}
                  className={`${styles.listTabItem} ${isActive ? styles.listTabItemActive : ''}`}
                  onClick={() => handleSelectList(list.id)}
                  onKeyDown={(event) => handleKeyDown(event, list.id)}
                >
                  {list.title}
                </li>
              );
            })}
          </ul>
          <div className={styles.tasks}>
            <div className={styles.tasksHeader}>
              <h1 className={styles.taskListMainTitle}>タスク一覧</h1>
              <Link to="/task/new">タスク新規作成</Link>
            </div>
            <div className={styles.displaySelectWrapper}>
              <select onChange={handleIsDoneDisplayChange} className={styles.displaySelect}>
                <option value="todo">未完了</option>
                <option value="done">完了</option>
              </select>
            </div>
            <Tasks tasks={tasks} selectListId={selectListId} isDoneDisplay={isDoneDisplay} />
          </div>
        </div>
      </main>
    </div>
  );
};
