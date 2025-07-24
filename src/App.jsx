import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUser } from "~/store/auth/index"
import { Router } from "./routes/Router"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    void dispatch(fetchUser())
  }, [dispatch])

  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
