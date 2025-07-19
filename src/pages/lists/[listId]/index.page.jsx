import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TaskItem } from '~/components/TaskItem';
import { TaskCreateForm } from '~/components/TaskCreateForm';
import { setCurrentList } from '~/store/list';
import { fetchTasks } from '~/store/task';
import './index.css';
import { Modal } from '~/components/Modal';
import EditList from './edit/index.page';
import EditTask from './tasks/[taskId]/index.page';

const ListIndex = () => {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const isLoading = useSelector(state => state.task.isLoading || state.list.isLoading);

  const tasks = useSelector(state => state.task.tasks);
  const listName = useSelector(state => {
    const currentId = state.list.current;
    const list = state.list.lists?.find(list => list.id === currentId);
    return list?.title;
  });
  const incompleteTasksCount = useSelector(state => {
    return state.task.tasks?.filter(task => !task.done).length;
  });

  useEffect(() => {
    dispatch(setCurrentList(listId));
    dispatch(fetchTasks()).unwrap();
  }, [listId, dispatch]);

  if (isLoading) {
    return <div></div>;
  }

  const openTaskEditModal = taskId => {
    setSelectedTaskId(taskId);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="tasks_list">
      <div className="tasks_list__title">
        {listName}
        {incompleteTasksCount > 0 && (
          <span className="tasks_list__title__count">{incompleteTasksCount}</span>
        )}
        <div className="tasks_list__title_spacer"></div>
        <button className="app_button" onClick={() => setIsListModalOpen(true)}>
          Edit...
        </button>
      </div>
      <div className="tasks_list__items">
        <TaskCreateForm />
        {tasks?.map(task => (
          <TaskItem key={task.id} task={task} onEdit={() => openTaskEditModal(task.id)} />
        ))}
        {tasks?.length === 0 && <div className="tasks_list__items__empty">No tasks yet!</div>}
      </div>

      {isListModalOpen && (
        <Modal onClose={() => setIsListModalOpen(false)}>
          <EditList onClose={() => setIsListModalOpen(false)} />
        </Modal>
      )}

      {isTaskModalOpen && (
        <Modal onClose={() => setIsTaskModalOpen(false)}>
          <EditTask taskId={selectedTaskId} onClose={() => setIsTaskModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ListIndex;
