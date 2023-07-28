import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setCurrentList } from '~/store/list'
import { fetchTodos } from '~/store/todo'

const ListIndex = () => {
  const dispatch = useDispatch()
  const { listId } = useParams()

  useEffect(() => {
    dispatch(setCurrentList(listId))
    dispatch(fetchTodos()).unwrap()
  }, [listId])

  return <div>TODO</div>
}

export default ListIndex
