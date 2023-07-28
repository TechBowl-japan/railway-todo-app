import styles from './TaskItem.module.css'

export const TaskItem = ({ task }) => {
  const { id, title, detail, done } = task

  return (
    <div className={styles.task_item}>
      <div className={styles.task_item__title_container}>
        {done ? (
          <div
            className={styles.task_item__mark____complete}
            aria-label="Completed"
          ></div>
        ) : (
          <div
            className={styles.task_item__mark____incomplete}
            aria-label="Incomplete"
          ></div>
        )}
        <div className={styles.task_item__title}>{title}</div>
      </div>
      <div className={styles.task_item__detail}>{detail}</div>
    </div>
  )
}
