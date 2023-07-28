import { ListIcon } from '~/icons/ListIcon'
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import { PlusIcon } from '~/icons/PlusIcon'

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
  const isLoggedIn = true

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.sidebar__title}>Todos</h1>
      {isLoggedIn ? (
        <>
          {lists && (
            <div className={styles.sidebar__lists}>
              <h2 className={styles.sidebar__lists_title}>Lists</h2>
              <ul className={styles.sidebar__lists_items}>
                {lists.map((listItem) => (
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
                  <button
                    type="button"
                    className={styles.sidebar__lists_button}
                  >
                    <PlusIcon className={styles.sidebar__lists_plus_icon} />
                    New List...
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div className={styles.sidebar__spacer} aria-hidden />
          <div className={styles.sidebar__account}>
            <p className={styles.sidebar__account_name}>John Doe</p>
            <button type="button" className={styles.sidebar__account_logout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className={styles.sidebar__login}>
            Login
          </Link>
        </>
      )}
    </div>
  )
}
