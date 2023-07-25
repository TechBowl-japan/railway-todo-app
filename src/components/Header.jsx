import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../store/auth/index'
import styles from './Header.module.css'

export const Header = () => {
  const auth = useSelector(state => state.auth.isSignIn)
  const dispatch = useDispatch()
  const history = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies()
  const handleSignOut = () => {
    dispatch(signOut())
    removeCookie('token')
    history.push('/signin')
  }

  return (
    <header className={styles.header}>
      <h1>Todoアプリ</h1>
      {auth ? (
        <button onClick={handleSignOut} className={styles['header__logout_button']}>
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  )
}
