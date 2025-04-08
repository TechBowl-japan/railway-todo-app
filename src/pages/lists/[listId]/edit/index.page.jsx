import { useCallback, useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { BackButton } from '~/components/BackButton'
import './index.css'
import { fetchLists, updateList, deleteList } from '~/store/list'
import { useId } from '~/hooks/useId'

const EditList = () => {
  const id = useId()

  const { listId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const list = useSelector(state =>
    state.list.lists?.find(list => list.id === listId),
  )

  useEffect(() => {
    if (list) {
      setTitle(list.title)
    }
  }, [list])

  useEffect(() => {
    void dispatch(fetchLists())
  }, [listId])

  const onSubmit = useCallback(
    event => {
      event.preventDefault()

      setIsSubmitting(true)

      void dispatch(updateList({ id: listId, title }))
        .unwrap()
        .then(() => {
          history.push(`/lists/${listId}`)
        })
        .catch(err => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    },
    [title, listId],
  )

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this list?')) {
      return
    }

    setIsSubmitting(true)

    void dispatch(deleteList({ id: listId }))
      .unwrap()
      .then(() => {
        history.push(`/`)
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }, [])

  return (
    <main className="edit_list">
      <BackButton />
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Name
          </label>
          <input
            id={`${id}-title`}
            className="app_input"
            placeholder="Family"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </fieldset>
        <div className="edit_list__form_actions">
          <Link to="/" data-variant="secondary" className="app_button">
            Cancel
          </Link>
          <div className="edit_list__form_actions_spacer"></div>
          <button
            type="button"
            className="app_button edit_list__form_actions_delete"
            disabled={isSubmitting}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button type="submit" className="app_button" disabled={isSubmitting}>
            Update
          </button>
        </div>
      </form>
    </main>
  )
}

export default EditList
