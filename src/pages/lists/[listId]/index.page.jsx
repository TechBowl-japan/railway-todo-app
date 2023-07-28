import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { TaskItem } from '~/components/TaskItem'
import { setCurrentList } from '~/store/list'
import { fetchTodos } from '~/store/todo'
import './index.css'

const ListIndex = () => {
  const dispatch = useDispatch()
  const { listId } = useParams()

  const isLoading = useSelector(
    (state) => state.todo.isLoading || state.list.isLoading
  )

  const todos = useSelector((state) => state.todo.todos)
  const listName = useSelector((state) => {
    const currentId = state.list.current
    const list = state.list.lists?.find((list) => list.id === currentId)
    return list?.title
  })
  const incompleteTodosCount = useSelector((state) => {
    return state.todo.todos?.filter((todo) => !todo.done).length
  })

  useEffect(() => {
    dispatch(setCurrentList(listId))
    dispatch(fetchTodos()).unwrap()
  }, [listId])

  if (isLoading) {
    return <div></div>
  }

  return (
    <div className="tasks_list">
      <div className="tasks_list__title">
        {listName}
        {incompleteTodosCount > 0 && (
          <span className="tasks_list__title__count">
            {incompleteTodosCount}
          </span>
        )}
        <div className="tasks_list__title_spacer"></div>
        <Link to={`/lists/${listId}/edit`}>
          <button className="app_button">Edit...</button>
        </Link>
      </div>
      <div className="tasks_list__items">
        {todos?.map((todo) => {
          return <TaskItem key={todo.id} task={todo} />
        })}
        {todos?.length === 0 && (
          <div className="tasks_list__items__empty">No tasks yet!</div>
        )}
      </div>
    </div>
  )
}

export default ListIndex
