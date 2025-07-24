import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchLists } from "~/store/list/index"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentListId = useSelector((state) => state.list.current)

  useEffect(() => {
    dispatch(fetchLists())
  }, [dispatch])

  useEffect(() => {
    if (currentListId) {
      navigate(`/lists/${currentListId}`)
    }
  }, [currentListId, navigate])

  return <div></div>
}

export default Home
