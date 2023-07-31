import { useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PencilIcon } from '~/icons/PencilIcon'
import { CheckIcon } from '~/icons/CheckIcon'
import { updateTask } from '~/store/task'
import styles from './TaskItem.module.css'

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch()

  const { listId } = useParams()
  const { id, title, detail, done } = task

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggle = useCallback(() => {
    setIsSubmitting(true)
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false)
    })
  }, [id, done])

  return (
    <div className={styles.task_item}>
      <div className={styles.task_item__title_container}>
        <button
          type="button"
          onClick={handleToggle}
          disabled={isSubmitting}
          className={styles.task__item__mark_button}
        >
          {done ? (
            <div
              className={styles.task_item__mark____complete}
              aria-label="Completed"
            >
              <CheckIcon className={styles.task_item__mark____complete_check} />
            </div>
          ) : (
            <div
              className={styles.task_item__mark____incomplete}
              aria-label="Incomplete"
            ></div>
          )}
        </button>
        <div className={styles.task_item__title}>{title}</div>
        <div aria-hidden className={styles.task_item__title_spacer}></div>
        <Link
          to={`/lists/${listId}/tasks/${id}`}
          className={styles.task_item__title_action}
        >
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className={styles.task_item__detail}>{detail}</div>
    </div>
  )
}
