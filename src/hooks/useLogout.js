import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '~/store/auth'

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = useCallback(async () => {
    await dispatch(logout()).unwrap()
    navigate('/signin')
  }, [useDispatch])

  return {
    logout: handleLogout,
  }
}
