import { ListIcon } from '~/icons/ListIcon'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { PlusIcon } from '~/icons/PlusIcon'
import { useSelector, useDispatch } from 'react-redux'
import { useLogout } from '~/hooks/useLogout'
import { useEffect } from 'react'
import { fetchLists } from '~/store/list/index'

export const Sidebar = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const lists = useSelector(state => state.list.lists)
  const activeId = useSelector(state => state.list.current)
  const isLoggedIn = useSelector(state => state.auth.token !== null)
  const userName = useSelector(state => state.auth.user?.name)

  // リスト新規作成ページではリストをハイライトしない
  const shouldHighlight = !pathname.startsWith('/list/new')

  const { logout } = useLogout()

  useEffect(() => {
    void dispatch(fetchLists())
  }, [])

  return (
    <div className="sidebar">
      <Link to="/">
        <h1 className="sidebar__title">Todos</h1>
      </Link>
      {isLoggedIn ? (
        <>
          {lists && (
            <div className="sidebar__lists">
              <h2 className="sidebar__lists_title">Lists</h2>
              <ul className="sidebar__lists_items">
                {lists.map(listItem => (
                  <li key={listItem.id}>
                    <Link
                      data-active={shouldHighlight && listItem.id === activeId}
                      to={`/lists/${listItem.id}`}
                      className="sidebar__lists_item"
                    >
                      <ListIcon
                        aria-hidden
                        className="sidebar__lists_icon"
                      />
                      {listItem.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/list/new" className="sidebar__lists_button">
                    <PlusIcon className="sidebar__lists_plus_icon" />
                    New List...
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className="sidebar__spacer" aria-hidden />
          <div className="sidebar__account">
            <p className="sidebar__account_name">{userName}</p>
            <button
              type="button"
              className="sidebar__account_logout"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/signin" className="sidebar__login">
            Login
          </Link>
        </>
      )}
    </div>
  )
}
