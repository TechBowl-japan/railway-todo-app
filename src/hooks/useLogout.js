import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { logout } from '~/store/auth'

export const useLogout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = useCallback(async () => {
    await dispatch(logout()).unwrap()
    history.push('/signin')
  }, [useDispatch])

  return {
    logout: handleLogout,
  }
}
