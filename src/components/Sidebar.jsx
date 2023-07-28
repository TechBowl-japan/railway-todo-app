import { ListIcon } from '~/icons/ListIcon'
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import { PlusIcon } from '~/icons/PlusIcon'
import { useSelector } from 'react-redux'
import { useLogout } from '~/hooks/useLogout'

export const Sidebar = () => {
  const lists = [
    {
      id: '1',
      name: 'List 1',
    },
    {
      id: '2',
      name: 'List 2',
    },
    {
      id: '3',
      name: 'List 3',
    },
  ]

  const activeId = '1'

  const isLoggedIn = useSelector(state => state.auth.token !== null)
  const userName = useSelector(state => state.auth.user?.name)

  const { logout } = useLogout()

  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <h1 className={styles.sidebar__title}>Todos</h1>
      </Link>
      {isLoggedIn ? (
        <>
          {lists && (
            <div className={styles.sidebar__lists}>
              <h2 className={styles.sidebar__lists_title}>Lists</h2>
              <ul className={styles.sidebar__lists_items}>
                {lists.map(listItem => (
                  <li key={listItem.id}>
                    <Link
                      data-active={listItem.id === activeId}
                      to={`/lists/${listItem.id}`}
                      className={styles.sidebar__lists_item}
                    >
                      <ListIcon
                        aria-hidden
                        className={styles.sidebar__lists_icon}
                      />
                      {listItem.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/list/new" className={styles.sidebar__lists_button}>
                    <PlusIcon className={styles.sidebar__lists_plus_icon} />
                    New List...
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className={styles.sidebar__spacer} aria-hidden />
          <div className={styles.sidebar__account}>
            <p className={styles.sidebar__account_name}>{userName}</p>
            <button
              type="button"
              className={styles.sidebar__account_logout}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/signin" className={styles.sidebar__login}>
            Login
          </Link>
        </>
      )}
    </div>
  )
}
