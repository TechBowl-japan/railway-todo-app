import React, {useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import "./taskList.css";
import { Link } from "react-router-dom";


export const TaskList = () => {
  const [lists, setLists] = useState([])
  const [tasks, setTasks] = useState([])
  const [cookies] = useCookies()
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
      console.log(err);
    })
  }, [])

  useEffect(() => {
    const listId = lists[0]?.id
    if(typeof listId !== "undefined"){
      axios.get(`${url}/lists/${listId}/tasks`, {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      })
      .then((res) => {
        setTasks(res.data.tasks)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [lists])

  const handleSelectList = (id) => {
    axios.get(`${url}/lists/${id}/tasks`, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      setTasks(res.data.tasks)
    })
    .catch((err) => {
      console.log(err);
    })
  }

return (
  <main className="taskList">
    <div>
      <div className="list">
        <select onChange={(e) => handleSelectList(e.target.value)}>
          {lists.map((list, key) => (
            <option key={key} className="list-item" value={list.id}>{list.title}</option>
          ))}
        </select>
        <Link to="/lists/new">リスト新規作成</Link>
      </div>
      <div className="tasks">
        <div className="tasks-header">
          <h2>タスク一覧</h2>
          <Link to="/task/new">タスク新規作成</Link>
        </div>
        <ul>
          {tasks.map((task, key) => (
            <li key={key} className="task-item">
              <Link to={`/tasks/${task.id}`} className="task-item-link">
                {task.title}<br />
                {task.done ? "完了" : "未完了"}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </main>
  )
}