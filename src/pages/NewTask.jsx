import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { url } from "../const";
import { Header } from "../components/Header";
import "./newTask.scss"
import { useNavigate } from "react-router-dom";

export const NewTask = () => {
  const [selectListId, setSelectListId] = useState();
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [limit, setLimit] = useState("");
  const [inputLimit ,] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleSelectList = (id) => setSelectListId(id);
  // const handleLimitChange = (e) => setLimit(e.target.value);
  const handleInputLimitChange =  (e) => setLimit(e.target.value + ":00Z")
  const onCreateTask = () => {
    const data = {
      title: title,
      detail: detail,
      done: false,
      limit: limit
    };

    axios.post(`${url}/lists/${selectListId}/tasks`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
    })
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      setErrorMessage(`タスクの作成に失敗しました。${err}`);
    })
  }

  useEffect(() => {
    axios.get(`${url}/lists`, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      setLists(res.data)
      setSelectListId(res.data[0]?.id)
    })
    .catch((err) => {
      setErrorMessage(`リストの取得に失敗しました。${err}`);
    })
  }, [cookies.token])

  return (
    <div>
      <Header />
      <main className="new-task">
        <h2>タスク新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          <label>リスト</label><br />
          <select onChange={(e) => handleSelectList(e.target.value)} className="new-task-select-list">
            {lists.map((list, key) => (
              <option key={key} className="list-item" value={list.id}>{list.title}</option>
            ))}
          </select><br />
          <label>タイトル</label><br />
          <input type="text" onChange={handleTitleChange} className="new-task-title" /><br />
          <label>期限日時</label><br />
          <p>{new Date(limit.slice(0,-1)).toLocaleDateString()}  {new Date(limit.slice(0,-1)).toLocaleTimeString('ja-JP')}</p>
          <input
            type="datetime-local"
            className="edit-task-detail"
            value={inputLimit}
            min={new Date()}
            onChange={handleInputLimitChange}
          /><br />
          {/* <input type="text" onChange={handleLimitChange} className="new-task-limit" /><br /> */}
          <label>詳細</label><br />
          <textarea type="text" onChange={handleDetailChange} className="new-task-detail" /><br />
          <button type="button" className="new-task-button" onClick={onCreateTask}>作成</button>
        </form>
      </main>
    </div>
  )
}