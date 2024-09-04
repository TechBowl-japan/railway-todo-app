import { Link } from 'react-router-dom';

export const TaskListItem = (props) => {
  return (
    <li className={props.className} onClick={props.onClick}>
      <Link to={props.linkTo} className="task-item-link">
        <p>{props.title}</p>
        <p>期限：{props.limit}</p>
        {props.timeLeft && <p>{props.timeLeft}</p>}
        {props.done ? '完了' : '未完了'}
      </Link>
    </li>
  );
};
