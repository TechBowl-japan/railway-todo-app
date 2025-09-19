import { useCallback, useEffect, useMemo, useState } from "react"
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "~/components/Button"
import { Input } from "~/components/Input"
import { useId } from "~/hooks/useId"
import { deleteTask, updateTask } from "~/store/task"
import "./EditTaskModal.css"

if (typeof document !== "undefined") {
  try {
    Modal.setAppElement("#root")
  } catch {}
}

export const EditTaskModal = ({ isOpen, onRequestClose, taskId }) => {
  const id = useId()
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [detail, setDetail] = useState("")
  const [done, setDone] = useState(false)
  const [limit, setLimit] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const task = useSelector((state) =>
    state.task.tasks?.find((task) => task.id === taskId),
  )

  useEffect(() => {
    if (!isOpen) return
    setErrorMessage("")
    if (task) {
      setTitle(task.title)
      setDetail(task.detail)
      setDone(task.done)
      const d = new Date(task.limit)
      setLimit(
        new Date(d.getTime() - d.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16),
      )
    }
  }, [task, isOpen])

  const toUTCString = useCallback((localStr) => {
    if (!localStr) return null
    const utcTime = new Date(localStr)
    return utcTime.toISOString()
  }, [])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setIsSubmitting(true)
      const payload = { id: taskId, title, detail, done }
      if (limit) {
        const utc = toUTCString(limit)
        if (utc) payload.limit = utc
      }

      void dispatch(updateTask(payload))
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
    [dispatch, taskId, title, detail, done, limit, toUTCString, onRequestClose],
  )

  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }

    setIsSubmitting(true)

    void dispatch(deleteTask({ id: taskId }))
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
  }, [dispatch, taskId, onRequestClose])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="edit_task_modal__overlay"
      className="edit_task_modal"
      shouldCloseOnOverlayClick
      contentLabel="Edit Task"
    >
      <h2 className="edit_task_modal__title">Edit Task</h2>
      <p className="edit_task_modal__error">{errorMessage}</p>
      <form className="edit_task_modal__form" onSubmit={onSubmit}>
        <fieldset className="edit_task_modal__form_field">
          <label
            htmlFor={`${id}-title`}
            className="edit_task_modal__form_label"
          >
            Title
          </label>
          <Input
            id={`${id}-title`}
            placeholder="Buy some milk"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>

        <fieldset className="edit_task_modal__form_field">
          <label
            htmlFor={`${id}-detail`}
            className="edit_task_modal__form_label"
          >
            Description
          </label>
          <textarea
            id={`${id}-detail`}
            className="app_input"
            placeholder="Blah blah blah"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
        </fieldset>

        <fieldset className="edit_task_modal__form_field">
          <label htmlFor={`${id}-done`} className="edit_task_modal__form_label">
            Is Done
          </label>
          <div>
            <input
              id={`${id}-done`}
              type="checkbox"
              checked={done}
              onChange={(event) => setDone(event.target.checked)}
            />
          </div>
        </fieldset>

        <fieldset className="edit_task_modal__form_field">
          <label
            htmlFor={`${id}-limit`}
            className="edit_task_modal__form_label"
          >
            Due Date
          </label>
          <input
            id={`${id}-limit`}
            className="app_input"
            type="datetime-local"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
          />
        </fieldset>

        <div className="edit_task_modal__form_actions">
          <Button
            type="button"
            variant="secondary"
            className="app_button"
            onClick={onRequestClose}
          >
            Cancel
          </Button>
          <div className="edit_task_modal__form_actions_spacer" />
          <Button
            type="button"
            className="app_button edit_task_modal__form_actions_delete"
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

export default EditTaskModal
