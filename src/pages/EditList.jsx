import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { url } from '../const'
import './editList.css'

// EditList コンポーネント
export const EditList = () => {
  // React RouterのナビゲーションフックとURLパラメータの取得
  const navigate = useNavigate()
  const { listId } = useParams()

  // Stateの初期化
  const [title, setTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [cookies] = useCookies()

  // イベントハンドラーの定義
  const handleTitleChange = (e) => setTitle(e.target.value)

  // リストの更新処理
  const onUpdateList = () => {
    const data = {
      title: title,
    }

    axios
      .put(`${url}/lists/${listId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate.push('/')
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。 ${err}`)
      })
  }

  // リストの削除処理
  const onDeleteList = () => {
    axios
      .delete(`${url}/lists/${listId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate.push('/')
      })
      .catch((err) => {
        setErrorMessage(`削除に失敗しました。${err}`)
      })
  }

  // リスト情報の取得処理
  useEffect(() => {
    axios
      .get(`${url}/lists/${listId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const list = res.data
        setTitle(list.title)
      })
      .catch((err) => {
        setErrorMessage(`リスト情報の取得に失敗しました。${err}`)
      }) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // JSXを返す
  return (
    <div>
      {/* ヘッダーコンポーネントの表示 */}
      <Header />
      <main className="edit-list">
        <h2>リスト編集</h2>
        {/* エラーメッセージの表示 */}
        <p className="error-message">{errorMessage}</p>
        {/* フォーム */}
        <form className="edit-list-form">
          <label>タイトル</label>
          <br />
          {/* タイトルの入力欄 */}
          <input
            type="text"
            className="edit-list-title"
            value={title}
            onChange={handleTitleChange}
          />
          <br />
          {/* リストの削除ボタン */}
          <button
            type="button"
            className="delete-list-button"
            onClick={onDeleteList}
          >
            削除
          </button>
          {/* リストの更新ボタン */}
          <button
            type="button"
            className="edit-list-button"
            onClick={onUpdateList}
          >
            更新
          </button>
        </form>
      </main>
    </div>
  )
}
