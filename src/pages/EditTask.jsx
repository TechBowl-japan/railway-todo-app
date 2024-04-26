import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { useNavigate, useParams } from "react-router-dom";
import "./editTask.scss"

export const EditTask = () => {
  const navigate = useNavigate();
  const { listId, taskId } = useParams();
  const [cookies] = useCookies();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isDone, setIsDone] = useState();
  const [limit,setLimit] = useState("");
  const [inputLimit ,] = useState("");
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
  // const handleLimitChange = (e) => setLimit(e.target.value);
  const handleInputLimitChange =  (e) => setLimit(e.target.value + ":00Z")
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
        const current_date = new Date()
        const difference = calculateTimeDifference(
          // APIで返される時間はYYYY-MM-DDTHH:MM:SSZだがnew Date()はYYYY-MM-DDTHH:MM:SSである
          new Date(task.limit.slice(0,-1)),
          current_date
        );
        setTimeDifference(difference);
      })
      .catch((err) => {
        setErrorMessage(`タスク情報の取得に失敗しました。${err}`);
      });
  }, [cookies.token, listId, taskId]);



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
          <p>{new Date(limit.slice(0,-1)).toLocaleDateString()}  {new Date(limit.slice(0,-1)).toLocaleTimeString('ja-JP')}</p>
          <input
            type="datetime-local"
            className="edit-task-detail"
            value={inputLimit}
            min={new Date()}
            onChange={handleInputLimitChange}
          />
            <br />
          <label>残り日時</label><br />
          <p className="edit-task-remain">
          {timeDifference.years < 0 || timeDifference.months < 0 || timeDifference.days < 0 || timeDifference.hours < 0 || timeDifference.minutes < 0 ? (
            "期限切れ"):(
            <>
            {timeDifference.years}年
            {timeDifference.months}か月
            {timeDifference.days}日
            {timeDifference.hours}時間
            {timeDifference.minutes}分
            </>
            )
          }
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