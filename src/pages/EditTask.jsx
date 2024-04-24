import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { useNavigate, useParams } from "react-router-dom";
import "./editTask.scss"

export const EditTask = () => {
  const navigate = useNavigate();
  // const current_date = new Date();
  const { listId, taskId } = useParams();
  const [cookies] = useCookies();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isDone, setIsDone] = useState();
  const [limit,setLimit] = useState("");
  const [timeDifference,setTimeDifference] = useState({
    years: 0,
    month:0,
    days: 0,
    hours: 0,
    minutes:0,
    seconds: 0
  })

  const [errorMessage, setErrorMessage] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleIsDoneChange = (e) => setIsDone(e.target.value === "done");
  const handleLimitChange = (e) => setLimit(e.target.value);
  const onUpdateTask = () => {
    console.log(isDone)
    const data = {
      title: title,
      detail: detail,
      done: isDone,
      limit: limit
    }

    axios.put(`${url}/lists/${listId}/tasks/${taskId}`, data, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      console.log(res.data)
      navigate("/");
    })
    .catch((err) => {
      setErrorMessage(`更新に失敗しました。${err}`);
    })
  }

  const onDeleteTask = () => {
    axios.delete(`${url}/lists/${listId}/tasks/${taskId}`, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      setErrorMessage(`削除に失敗しました。${err}`);
    })
  }
  useEffect(() => {
    axios
      .get(`${url}/lists/${listId}/tasks/${taskId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      })
      .then((res) => {
        const task = res.data;
        setTitle(task.title);
        setDetail(task.detail);
        setIsDone(task.done);
        setLimit(task.limit);
        const difference = calculateTimeDifference(
          new Date(task.limit).getTime(),
          new Date().getTime()
        );
        setTimeDifference(difference);
      })
      .catch((err) => {
        setErrorMessage(`タスク情報の取得に失敗しました。${err}`);
      });
  }, [cookies.token, listId, taskId]);


  const calculateTimeDifference = (date1, date2) => {
    const difference = (date1 - date2) / 1000; // ミリ秒から秒に変換
    const years = Math.floor(difference / (365 * 24 * 60 * 60));
    const months = Math.floor((difference % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
    const days = Math.floor((difference % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
    const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((difference % (60 * 60)) / 60);
    const seconds = Math.floor(difference % 60);

    return { years, months, days, hours, minutes, seconds };
  };


  return (
    <div>
      <Header />
      <main className="edit-task">
        <h2>タスク編集</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="edit-task-form">
          <label>タイトル</label><br />
          <input type="text" onChange={handleTitleChange} className="edit-task-title" value={title} /><br />
          <label>期限日時</label><br />
          <input type="text" onChange={handleLimitChange} className="edit-task-detail" value={limit} /><br />
          <label>残り日時</label><br />
          <p className="edit-task-remain">
            {timeDifference.years}年
            {timeDifference.months}か月
            {timeDifference.days}日
            {timeDifference.hours}時間
            {timeDifference.minutes}分
            {timeDifference.seconds}秒
          </p>
          <label>詳細</label><br />
          <textarea type="text" onChange={handleDetailChange} className="edit-task-detail" value={detail} /><br />
          <div>
            <input type="radio" id="todo" name="status" value="todo" onChange={handleIsDoneChange} checked={isDone === false ? "checked" : ""} />未完了
            <input type="radio" id="done" name="status" value="done" onChange={handleIsDoneChange} checked={isDone === true ? "checked" : ""} />完了
          </div>
          <button type="button" className="delete-task-button" onClick={onDeleteTask}>削除</button>
          <button type="button" className="edit-task-button" onClick={onUpdateTask}>更新</button>
        </form>
      </main>
    </div>
  )
}