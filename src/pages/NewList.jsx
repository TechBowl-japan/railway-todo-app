import React, { useState } from 'react'
import axios from '~/vendor/axios'
import { Header } from '../components/Header'
import { useNavigate } from 'react-router-dom'
import './newList.css'

export const NewList = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleTitleChange = e => setTitle(e.target.value)
  const onCreateList = () => {
    const data = {
      title: title,
    }

    axios
      .post(`/lists`, data)
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        setErrorMessage(`リストの作成に失敗しました。${err}`)
      })
  }

  return (
    <div>
      <Header />
      <main className="new-list">
        <h2>リスト新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-list-form">
          <label>タイトル</label>
          <br />
          <input
            type="text"
            onChange={handleTitleChange}
            className="new-list-title"
          />
          <br />
          <button
            type="button"
            onClick={onCreateList}
            className="new-list-button"
          >
            作成
          </button>
        </form>
      </main>
    </div>
  )
}
