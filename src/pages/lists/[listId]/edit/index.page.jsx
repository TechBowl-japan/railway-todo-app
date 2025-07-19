import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from '~/components/BackButton';
import './index.css';
import { fetchLists, updateList, deleteList } from '~/store/list';
import { useId } from '~/hooks/useId';
import { Button } from '~/components/Button';
import PropTypes from 'prop-types';
const EditList = ({ onClose }) => {
  const id = useId();

  const { listId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const list = useSelector(state => state.list.lists?.find(list => list.id === listId));

  useEffect(() => {
    if (list) {
      setTitle(list.title);
    }
  }, [list]);

  useEffect(() => {
    void dispatch(fetchLists());
  }, [listId, dispatch]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setIsSubmitting(true);

      void dispatch(updateList({ id: listId, title }))
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
    },
    [title, listId, dispatch, onClose]
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this list?')) return;

    setIsSubmitting(true);
    void dispatch(deleteList({ id: listId }))
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
  }, [dispatch, listId, onClose]);

  return (
    <main className="edit_list">
      <BackButton onClick={onClose} />
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Name
          </label>
          <input
            id={`${id}-title`}
            className="app_input"
            placeholder="Family"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </fieldset>
        <div className="edit_list__form_actions">
          <button type="button" data-variant="secondary" className="app_button" onClick={onClose}>
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
          <Button type="submit" disabled={isSubmitting}>
            Update
          </Button>
        </div>
      </form>
    </main>
  );
};

EditList.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EditList;
