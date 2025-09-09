import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import "./TaskCreateForm.css"
import { CheckIcon } from "~/icons/CheckIcon"
import { createTask } from "~/store/task"
import { Button } from "./Button"
import { Input } from "./Input"

export const TaskCreateForm = () => {
  const dispatch = useDispatch()

  const refForm = useRef(null)
  const [elemTextarea, setElemTextarea] = useState(null)

  const [formState, setFormState] = useState("initial")

  const [title, setTitle] = useState("")
  const [detail, setDetail] = useState("")
  const [done, setDone] = useState(false)
  const [limit, setLimit] = useState("")

  const toUTCString = useCallback((localStr) => {
    if (!localStr) return null
    const utcTime = new Date(localStr)
    return utcTime.toISOString()
  }, [])

  const handleToggle = useCallback(() => {
    setDone((prev) => !prev)
  }, [])

  const handleFocus = useCallback(() => {
    setFormState("focused")
  }, [])

  const handleBlur = useCallback(() => {
    if (title || detail || limit) {
      return
    }

    setTimeout(() => {
      // フォーム内の要素がフォーカスされている場合は何もしない
      const formElement = refForm.current
      if (formElement?.contains(document.activeElement)) {
        return
      }

      setFormState("initial")
      setDone(false)
    }, 100)
  }, [title, detail, limit])

  const handleDiscard = useCallback(() => {
    setTitle("")
    setDetail("")
    setFormState("initial")
    setDone(false)
    setLimit("")
  }, [])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setFormState("submitting")

      const payload = { title, detail, done }
      if (limit) {
        const utc = toUTCString(limit)
        if (utc) payload.limit = utc
      }

      void dispatch(createTask(payload))
        .unwrap()
        .then(() => {
          handleDiscard()
        })
        .catch((err) => {
          alert(err.message)
          setFormState("focused")
        })
    },
    [title, detail, done, limit, toUTCString, dispatch, handleDiscard],
  )

  useEffect(() => {
    if (!elemTextarea) {
      return
    }

    const recalcHeight = () => {
      elemTextarea.style.height = "auto"
      elemTextarea.style.height = `${elemTextarea.scrollHeight}px`
    }

    elemTextarea.addEventListener("input", recalcHeight)
    recalcHeight()

    return () => {
      elemTextarea.removeEventListener("input", recalcHeight)
    }
  }, [elemTextarea])

  return (
    <form
      ref={refForm}
      className="task_create_form"
      onSubmit={onSubmit}
      data-state={formState}
    >
      <div className="task_create_form__title_container">
        <Button
          type="button"
          onClick={handleToggle}
          className="task_create_form__mark_button"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {done ? (
            <div
              className="task_create_form__mark____complete"
              aria-label="Completed"
            >
              <CheckIcon className="task_create_form__mark____complete_check" />
            </div>
          ) : (
            <div
              className="task_create_form__mark____incomplete"
              aria-label="Incomplete"
            ></div>
          )}
        </Button>
        <Input
          type="text"
          className="task_create_form__title"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={formState === "submitting"}
        />
      </div>
      {formState !== "initial" && (
        <div>
          <textarea
            ref={setElemTextarea}
            rows={1}
            className="task_create_form__detail"
            placeholder="Add a description here..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            onBlur={handleBlur}
            disabled={formState === "submitting"}
          />
          <input
            type="datetime-local"
            className="task_create_form__due_date"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            onBlur={handleBlur}
            disabled={formState === "submitting"}
          />
          <div className="task_create_form__actions">
            <Button
              type="button"
              variant="secondary"
              onBlur={handleBlur}
              onClick={handleDiscard}
              disabled={(!title && !detail) || formState === "submitting"}
            >
              Discard
            </Button>
            <div className="task_create_form__spacer"></div>
            <Button
              onBlur={handleBlur}
              disabled={!title || !detail || formState === "submitting"}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
