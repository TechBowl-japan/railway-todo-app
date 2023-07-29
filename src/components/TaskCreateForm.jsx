import { useCallback, useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './TaskCreateForm.module.css'
import { CheckIcon } from '~/icons/CheckIcon'
import { createTodo } from '~/store/todo'

export const TaskCreateForm = () => {
  const dispatch = useDispatch()

  const refForm = useRef(null)
  const [elemTextarea, setElemTextarea] = useState(null)

  const [formState, setFormState] = useState('initial')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [done, setDone] = useState(false)

  const handleToggle = useCallback(() => {
    setDone(prev => !prev)
  }, [])

  const handleFocus = useCallback(() => {
    setFormState('focused')
  }, [])

  const handleBlur = useCallback(() => {
    if (title || description) {
      return
    }

    setTimeout(() => {
      // フォーム内の要素がフォーカスされている場合は何もしない
      const formElement = refForm.current
      if (formElement && formElement.contains(document.activeElement)) {
        return
      }

      setFormState('initial')
      setDone(false)
    }, 100)
  }, [title, description])

  const handleDiscard = useCallback(() => {
    setTitle('')
    setDescription('')
    setFormState('initial')
    setDone(false)
  }, [])

  const onSubmit = useCallback(
    event => {
      event.preventDefault()

      setFormState('submitting')

      void dispatch(createTodo({ title, detail: description, done }))
        .unwrap()
        .then(() => {
          handleDiscard()
        })
        .catch(err => {
          alert(err.message)
          setFormState('focused')
        })
    },
    [title, description, done],
  )

  useEffect(() => {
    if (!elemTextarea) {
      return
    }

    const recalcHeight = () => {
      elemTextarea.style.height = 'auto'
      elemTextarea.style.height = `${elemTextarea.scrollHeight}px`
    }

    elemTextarea.addEventListener('input', recalcHeight)
    recalcHeight()

    return () => {
      elemTextarea.removeEventListener('keydown', recalcHeight)
    }
  }, [elemTextarea])

  return (
    <form
      ref={refForm}
      className={styles.task_create_form}
      onSubmit={onSubmit}
      data-state={formState}
    >
      <div className={styles.task_create_form__title_container}>
        <button
          type="button"
          onClick={handleToggle}
          className={styles.task_create_form__mark_button}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {done ? (
            <div
              className={styles.task_create_form__mark____complete}
              aria-label="Completed"
            >
              <CheckIcon
                className={styles.task_create_form__mark____complete_check}
              />
            </div>
          ) : (
            <div
              className={styles.task_create_form__mark____incomplete}
              aria-label="Incomplete"
            ></div>
          )}
        </button>
        <input
          type="text"
          className={styles.task_create_form__title}
          placeholder="Add a new task..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={formState === 'submitting'}
        />
      </div>
      {formState !== 'initial' && (
        <div>
          <textarea
            ref={setElemTextarea}
            rows={1}
            className={styles.task_create_form__detail}
            placeholder="Add a description here..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            onBlur={handleBlur}
            disabled={formState === 'submitting'}
          />
          <div className={styles.task_create_form__actions}>
            <button
              type="button"
              className="app_button"
              data-variant="secondary"
              onBlur={handleBlur}
              onClick={handleDiscard}
              disabled={(!title && !description) || formState === 'submitting'}
            >
              Discard
            </button>
            <div className={styles.task_create_form__spacer}></div>
            <button
              type="submit"
              className="app_button"
              onBlur={handleBlur}
              disabled={!title || !description || formState === 'submitting'}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
