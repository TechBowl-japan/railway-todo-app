import { useDispatch } from 'react-redux'
import { Router } from './routes/Router'
import { useEffect } from 'react'
import { fetchUser } from '~/store/auth/index'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    void dispatch(fetchUser())
  }, [])

  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
