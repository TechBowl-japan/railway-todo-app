import React, { useState, useEffect } from 'react'
import axios from '~/vendor/axios'
import './index.css'
import { useNavigate } from 'react-router-dom'

const NewTask = () => {
  const [selectListId, setSelectListId] = useState()
  const [lists, setLists] = useState([])
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleTitleChange = e => setTitle(e.target.value)
  const handleDetailChange = e => setDetail(e.target.value)
  const handleSelectList = id => setSelectListId(id)
  const onCreateTask = () => {
    const data = {
      title: title,
      detail: detail,
      done: false,
    }

    axios
      .post(`/lists/${selectListId}/tasks`, data)
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        setErrorMessage(`タスクの作成に失敗しました。${err}`)
      })
  }

  useEffect(() => {
    axios
      .get(`/lists`)
      .then(res => {
        setLists(res.data)
        setSelectListId(res.data[0]?.id)
      })
      .catch(err => {
        setErrorMessage(`リストの取得に失敗しました。${err}`)
      })
  }, [])

  return (
    <div>
      <main className="new-task">
        <h2>タスク新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          <label>リスト</label>
          <br />
          <select
            onChange={e => handleSelectList(e.target.value)}
            className="new-task-select-list"
          >
            {lists.map((list, key) => (
              <option key={key} className="list-item" value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <br />
          <label>タイトル</label>
          <br />
          <input
            type="text"
            onChange={handleTitleChange}
            className="new-task-title"
          />
          <br />
          <label>詳細</label>
          <br />
          <textarea
            type="text"
            onChange={handleDetailChange}
            className="new-task-detail"
          />
          <br />
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
  )
}

export default NewTask
