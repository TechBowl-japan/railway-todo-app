import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { CheckIcon } from "~/icons/CheckIcon"
import { PencilIcon } from "~/icons/PencilIcon"
import { updateTask } from "~/store/task"
import "./TaskItem.css"
import { Button } from "./Button"
import { EditTaskModal } from "./EditTaskModal"

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch()

  const { listId } = useParams()
  const { id, title, detail, done } = task

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleToggle = useCallback(() => {
    setIsSubmitting(true)
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false)
    })
  }, [id, done, dispatch])

  const formatJST = (isoString) => {
    if (!isoString) return ""
    const date = new Date(isoString)
    if (Number.isNaN(date.getTime())) return ""
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Tokyo",
    }).format(date)
  }

  const formatRemaining = (isoString) => {
    if (!isoString) return ""
    const due = new Date(isoString)
    const nowDate = new Date()
    if (Number.isNaN(due.getTime())) return ""

    let diff = due.getTime() - nowDate.getTime()
    const isOver = diff < 0
    diff = Math.abs(diff)

    const minutes = Math.floor(diff / (60 * 1000))
    const days = Math.floor(minutes / (60 * 24))
    const hours = Math.floor((minutes % (60 * 24)) / 60)
    const mins = minutes % 60

    const parts = []
    if (days > 0) parts.push(`${days}日`)
    if (hours > 0) parts.push(`${hours}時間`)
    if (days === 0 && hours === 0) {
      parts.push(mins > 0 ? `${mins}分` : "1分未満")
    }

    const body = parts.join(" ")
    return isOver ? `期限切れ ${body}` : `あと ${body}`
  }

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <Button
          type="button"
          onClick={handleToggle}
          disabled={isSubmitting}
          className="task__item__mark_button"
        >
          {done ? (
            <div className="task_item__mark____complete" aria-label="Completed">
              <CheckIcon className="task_item__mark____complete_check" />
            </div>
          ) : (
            <div
              className="task_item__mark____incomplete"
              aria-label="Incomplete"
            ></div>
          )}
        </Button>
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <Link
          to={`/lists/${listId}/tasks/${id}`}
          className="task_item__title_action"
          onClick={(e) => {
            e.preventDefault()
            setIsEditOpen(true)
          }}
        >
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className="task_item__detail">{detail}</div>
      <div className="task_item__limit">
        期限: {formatJST(task.limit)}
        {task.limit && !done && `（${formatRemaining(task.limit)}）`}
      </div>
      <EditTaskModal
        isOpen={isEditOpen}
        onRequestClose={() => setIsEditOpen(false)}
        taskId={id}
      />
    </div>
  )
}
