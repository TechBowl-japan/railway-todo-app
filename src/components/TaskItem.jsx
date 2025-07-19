import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PencilIcon } from '~/icons/PencilIcon';
import { CheckIcon } from '~/icons/CheckIcon';
import { updateTask } from '~/store/task';
import './TaskItem.css';
import PropTypes from 'prop-types';

export const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const { id, title, detail, done, limit } = task;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [now, setNow] = useState(new Date());

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done, dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getRemainingTime = limit => {
    if (!limit) return '';
    const target = new Date(limit);
    const diff = target - now;
    const absDiff = Math.abs(diff);
    const sec = Math.floor(absDiff / 1000) % 60;
    const minutes = Math.floor(absDiff / (1000 * 60)) % 60;
    const hours = Math.floor(absDiff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));

    let result = '';
    if (days > 0) result += `${days}日`;
    if (hours > 0) result += `${hours}時間`;
    if (minutes > 0) result += `${minutes}分`;
    if (sec > 0) result += `${sec}秒`;

    return diff < 0 ? `期限切れ: ${result} 遅れています` : `あと ${result}`;
  };

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <button
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
            <div className="task_item__mark____incomplete" aria-label="Incomplete"></div>
          )}
        </button>
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <button
          type="button"
          className="task_item__title_action"
          onClick={onEdit}
          aria-label="Edit Task"
        >
          <PencilIcon />
        </button>
      </div>
      <div className="task_item__detail">{detail}</div>
      {limit && (
        <div className="task_item__limit">
          期限: {limit.slice(0, 16)}（{getRemainingTime(limit)}）
        </div>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string,
    done: PropTypes.bool.isRequired,
    limit: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};
