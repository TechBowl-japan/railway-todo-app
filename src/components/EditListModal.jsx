import { useCallback, useEffect, useId, useState } from "react"
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "./Button"
import { Input } from "./Input"
import "./EditListModal.css"
import { deleteList, updateList } from "~/store/list/index"

if (typeof document !== "undefined") {
  try {
    Modal.setAppElement("#root")
  } catch {}
}

export const EditListModal = ({ isOpen, onRequestClose, listId }) => {
  const id = useId()

  const dispatch = useDispatch()

  const [title, setTitle] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const list = useSelector((state) =>
    state.list.lists?.find((list) => list.id === listId),
  )

  useEffect(() => {
    if (!isOpen) return
    setErrorMessage("")
    if (list) {
      setTitle(list.title)
    }
  }, [isOpen, list])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setIsSubmitting(true)

      void dispatch(updateList({ id: listId, title }))
        .unwrap()
        .then(() => {
          onRequestClose?.()
        })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    },
    [title, listId, dispatch, onRequestClose],
  )

  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this list?")) {
      return
    }

    setIsSubmitting(true)

    void dispatch(deleteList({ id: listId }))
      .unwrap()
      .then(() => {
        onRequestClose?.()
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }, [listId, dispatch, onRequestClose])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="edit_list_modal__overlay"
      className="edit_list_modal"
      shouldCloseOnOverlayClick
      contentLabel="Edit List"
    >
      <h2 className="edit_list_modal__title">Edit List</h2>
      <p className="edit_list_modal__error">{errorMessage}</p>
      <form className="edit_list_modal__form" onSubmit={onSubmit}>
        <fieldset className="edit_list_modal__form_field">
          <label
            htmlFor={`${id}-title`}
            className="edit_list_modal__form_label"
          >
            Name
          </label>
          <Input
            id={`${id}-title`}
            placeholder="Family"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <div className="edit_list_modal__form_actions">
          <Button
            type="button"
            variant="secondary"
            className="app_button"
            onClick={onRequestClose}
          >
            Cancel
          </Button>
          <div className="edit_list_modal__form_actions_spacer"></div>
          <Button
            type="button"
            className="app_button edit_list_modal__form_actions_delete"
            disabled={isSubmitting}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button disabled={isSubmitting}>Update</Button>
        </div>
      </form>
    </Modal>
  )
}
