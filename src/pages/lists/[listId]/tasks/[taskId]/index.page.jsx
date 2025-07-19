import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from '~/components/BackButton';
import './index.css';
import { setCurrentList } from '~/store/list';
import { fetchTasks, updateTask, deleteTask } from '~/store/task';
import { useId } from '~/hooks/useId';
import { toISOStringWithTimezone } from '~/hooks/TaskLimit';
import PropTypes from 'prop-types';

const EditTask = ({ taskId, onClose }) => {
  const id = useId();

  const { listId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [limit, setLimit] = useState('');
  const [done, setDone] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector(state => state.task.tasks?.find(task => task.id === taskId));

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDetail(task.detail);
      setLimit(task.limit);
      setDone(task.done);
    }
  }, [task]);

  useEffect(() => {
    void dispatch(setCurrentList(listId));
    void dispatch(fetchTasks());
  }, [listId, dispatch]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();

      setIsSubmitting(true);
      const now = new Date(limit);
      const date = toISOStringWithTimezone(now);

      void dispatch(updateTask({ id: taskId, title, detail, done, limit: date }))
        .unwrap()
        .then(() => {
          onClose?.();
        })
        .catch(err => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, taskId, detail, done, limit, dispatch, onClose]
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch(err => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [taskId, dispatch, onClose]);

  return (
    <main className="edit_list">
      <BackButton onClick={onClose} />
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Title
          </label>
          <input
            id={`${id}-title`}
            className="app_input"
            placeholder="Buy some milk"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-detail`} className="edit_list__form_label">
            Description
          </label>
          <textarea
            id={`${id}-detail`}
            className="app_input"
            placeholder="Blah blah blah"
            value={detail}
            onChange={event => setDetail(event.target.value)}
          />
        </fieldset>

        <input
          type="datetime-local"
          onChange={e => {
            setLimit(e.target.value);
          }}
          className="new-task-title"
          value={limit ? limit.slice(0, 16) : ''}
        />
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-done`} className="edit_list__form_label">
            Is Done
          </label>
          <div>
            <input
              id={`${id}-done`}
              type="checkbox"
              checked={done}
              onChange={event => setDone(event.target.checked)}
            />
          </div>
        </fieldset>
        <div className="edit_list__form_actions">
          <button onClick={onClose} data-variant="secondary" className="app_button">
            Cancel
          </button>
          <div className="edit_list__form_actions_spacer"></div>
          <button
            type="button"
            className="app_button edit_list__form_actions_delete"
            disabled={isSubmitting}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button type="submit" className="app_button" disabled={isSubmitting}>
            Update
          </button>
        </div>
      </form>
    </main>
  );
};

EditTask.propTypes = {
  taskId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditTask;
