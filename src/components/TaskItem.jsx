import { Link, useParams } from 'react-router-dom'
import styles from './TaskItem.module.css'
import { PencilIcon } from '~/icons/PencilIcon'
import { CheckIcon } from '~/icons/CheckIcon'
import { useCallback } from 'react'

export const TaskItem = ({ task }) => {
  const { listId } = useParams()
  const { id, title, detail, done } = task

  const handleToggle = useCallback(() => {}, [])

  return (
    <div className={styles.task_item}>
      <div className={styles.task_item__title_container}>
        <button
          type="button"
          onClick={handleToggle}
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
