import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchLists } from "~/store/list/index"

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentListId = useSelector((state) => state.list.current)

  useEffect(() => {
    dispatch(fetchLists())
  }, [dispatch])

  useEffect(() => {
    if (currentListId) {
      history.push(`/lists/${currentListId}`)
    }
  }, [currentListId, history.push])

  return <div></div>
}

export default Home
