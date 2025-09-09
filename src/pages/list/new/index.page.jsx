import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BackButton } from "~/components/BackButton"
import "./index.css"
import { Button } from "~/components/Button"
import { Input } from "~/components/Input"
import { useId } from "~/hooks/useId"
import { createList, setCurrentList } from "~/store/list/index"

const NewList = () => {
  const id = useId()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setIsSubmitting(true)

      void dispatch(createList({ title }))
        .unwrap()
        .then((listId) => {
          dispatch(setCurrentList(listId))
          navigate(`/`)
        })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    },
    [title, dispatch, navigate],
  )

  return (
    <main className="new_list">
      <BackButton />
      <h2 className="new_list__title">New List</h2>
      <p className="new_list__error">{errorMessage}</p>
      <form className="new_list__form" onSubmit={onSubmit}>
        <fieldset className="new_list__form_field">
          <label htmlFor={`${id}-title`} className="new_list__form_label">
            Name
          </label>
          <Input
            id={`${id}-title`}
            placeholder="Family"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <div className="new_list__form_actions">
          <Link to="/" data-variant="secondary" className="app_button">
            Cancel
          </Link>
          <div className="new_list__form_actions_spacer"></div>
          <Button disabled={isSubmitting}>Create</Button>
        </div>
      </form>
    </main>
  )
}

export default NewList
