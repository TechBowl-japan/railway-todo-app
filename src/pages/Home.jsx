import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Header } from "../components/Header";
import { url } from "../const";
import "./home.scss";


export const Home = () => {
  const [isDoneDisplay, setIsDoneDisplay] = useState("todo"); // todo->未完了 done->完了
  const [lists, setLists] = useState([]);
  const [selectListId, setSelectListId] = useState();
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const handleIsDoneDisplayChange = (e) => setIsDoneDisplay(e.target.value);

  useEffect(() => {
    axios.get(`${url}/lists`, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      setLists(res.data)
    })
    .catch((err) => {
      setErrorMessage(`リストの取得に失敗しました。${err}`);
    })
  }, [cookies.token]);

  useEffect(() => {
    const listId = lists[0]?.id
    if(typeof listId !== "undefined"){
      setSelectListId(listId)
      axios.get(`${url}/lists/${listId}/tasks`, {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      })
      .then((res) => {
        setTasks(res.data.tasks)
      })
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      })
    }
  }, [lists,cookies.token]);

  const handleSelectList = (id) => {
    setSelectListId(id);
    console.log("呼び出されました")
    axios.get(`${url}/lists/${id}/tasks`, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      setTasks(res.data.tasks)
    })
    .catch((err) => {
      setErrorMessage(`タスクの取得に失敗しました。${err}`);
    })
  }
  const handleEnterList = (e,id) => {
    if (e.key === "Enter" ) {
      handleSelectList(id)
    }
  }
  return (
    <div>
      <Header />
      <main className="taskList">
        <p className="error-message">{errorMessage}</p>
        <div>
          <div className="list-header">
            <h2>リスト一覧</h2>
            <div className="list-menu">
              <p><Link to="/list/new">リスト新規作成</Link></p>
              <p><Link to={`/lists/${selectListId}/edit`}>選択中のリストを編集</Link></p>
            </div>
          </div>
          <div className="list-tab">
            {lists.map((list, key) => {
              const isActive = list.id === selectListId;
              return (
                <p
                  key={key}
                  tabIndex="0"
                  role="button"
                  className={`list-tab-item ${isActive ? "active" : ""}`}
                  onClick={() => handleSelectList(list.id)}
                  onKeyDown={(e) => handleEnterList(e,list.id)}
                >
                  {list.title}
                </p>
              )
            })}
          </div>
          <div className="tasks">
            <div className="tasks-header">
              <h2>タスク一覧</h2>
              <Link to="/task/new">タスク新規作成</Link>
            </div>
            <div className="display-select-wrapper">
              <select onChange={handleIsDoneDisplayChange} className="display-select">
                <option value="todo">未完了</option>
                <option value="done">完了</option>
              </select>
            </div>
            <Tasks tasks={tasks} selectListId={selectListId} isDoneDisplay={isDoneDisplay} />
          </div>
        </div>
      </main>
    </div>
  )
}

// 表示するタスク
const Tasks = (props) => {
  const { tasks, selectListId, isDoneDisplay } = props;

  const calculateTimeDifference = (date1, date2) => {

    const millisecondsDifference = date1 - date2;
    const secondsDifference = Math.floor(millisecondsDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    const years = Math.floor(daysDifference / 365);
    const months = Math.floor(daysDifference / 30); // 仮定
    const days = daysDifference % 30;
    const hours = hoursDifference % 24;
    const minutes = minutesDifference % 60;
    const seconds = secondsDifference % 60;

    return { years, months, days, hours, minutes, seconds };
  };
  if (tasks === null) return <></>

  if(isDoneDisplay === "done"){
    return (
      <ul>
        {tasks.filter((task) => {
          return task.done === true
        })
        .map((task, key) => (
          <li key={key} className="task-item">
            <Link to={`/lists/${selectListId}/tasks/${task.id}`} className="task-item-link">
              {task.title}<br />
              {task.done ? "完了" : "未完了"}<br />
              期限日時 : {task.limit}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul>
      {tasks.filter((task) => {
        return task.done === false
      })
      .map((task, key) => {
        const timeDifference = calculateTimeDifference(new Date(task.limit.slice(0,-1)),new Date())
        return(
        <li key={key} className="task-item">
          <Link to={`/lists/${selectListId}/tasks/${task.id}`} className="task-item-link">
            {task.title}<br />
            {task.done ? "完了" : "未完了"}<br />
            残り日時 :
            {timeDifference.years < 0 || timeDifference.month < 0 || timeDifference.days < 0 || timeDifference.hours < 0 || timeDifference.minutes < 0 ? (
            "期限切れ"):(
            <>{timeDifference.years}年
            {timeDifference.months}月
            {timeDifference.days}日
            {timeDifference.hours}時間
            {timeDifference.minutes}分</>

            )}
          </Link>
        </li>
      )})}
    </ul>
  )
}