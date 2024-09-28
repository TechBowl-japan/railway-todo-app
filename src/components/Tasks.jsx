import { formatForDisplay, getTimeDifference } from '../utils/dateUtils';
import { TaskListItem } from '../components/TaskListItem';
import styles from './tasks.module.css';

export default function Tasks(props) {
  const { tasks, selectListId, isDoneDisplay } = props;

  if (tasks === null) return null;

  return (
    <ul>
      {tasks
        .filter((task) => isDoneDisplay === task.done)
        .map((task) => {
          const limit = formatForDisplay(task.limit);
          const timeLeft = getTimeDifference(task.limit);
          return (
            <TaskListItem
              key={task.id}
              title={task.title}
              linkTo={`/lists/${selectListId}/tasks/${task.id}`}
              limit={limit}
              timeLeft={isDoneDisplay ? null : timeLeft}
              className={styles.taskItem}
              done={task.done}
            />
          );
        })}
    </ul>
  );
}
