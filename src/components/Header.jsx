import { useLogout } from '~/hooks/useLogout'
import styles from './Header.module.css'
import { useSelector } from 'react-redux'

export const Header = () => {
  const auth = useSelector(state => state.auth.token !== null)
  const { logout } = useLogout()

  return (
    <header className={styles.header}>
      <h1>Todoアプリ</h1>
      {auth ? (
        <button onClick={logout} className={styles['header__logout_button']}>
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  )
}
