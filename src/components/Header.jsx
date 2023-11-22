import React from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../authSlice'
import './header.css'

// Header コンポーネント
export const Header = () => {
  // Reduxの状態とディスパッチの取得
  const auth = useSelector((state) => state.auth.isSignIn)
  const dispatch = useDispatch()

  // React Routerのナビゲーションフックを取得
  const navigate = useNavigate()

  // Cookieフックを使用してクッキーの取得と削除
  const [cookies, setCookie, removeCookie] = useCookies()
  console.log(cookies, setCookie)

  // サインアウト処理
  const handleSignOut = () => {
    // Reduxのアクションをディスパッチしてサインアウト状態に変更
    dispatch(signOut())

    // クッキーの削除
    removeCookie('token')

    // サインインページにリダイレクト
    navigate.push('/signin')
  }

  // JSXを返す
  return (
    <header className="header">
      <h1>Todoアプリ</h1>
      {/* 認証済みの場合はサインアウトボタンを表示 */}
      {auth ? (
        <button onClick={handleSignOut} className="sign-out-button">
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  )
}
