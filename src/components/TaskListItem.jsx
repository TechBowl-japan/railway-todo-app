import { Link } from 'react-router-dom';
import styles from './taskListItem.module.css';

export const TaskListItem = (props) => {
  return (
    <li className={props.className} onClick={props.onClick}>
      <Link to={props.linkTo} className={styles.taskItemLink}>
        <p className={styles.taskTitle}>{props.title}</p>
        <p className={styles.limit}>期限：{props.limit}</p>
        {props.timeLeft && <p className={styles.timeLeft}>{props.timeLeft}</p>}
        <p className={styles.done}>{props.done ? '完了' : '未完了'}</p>
      </Link>
    </li>
  );
};
