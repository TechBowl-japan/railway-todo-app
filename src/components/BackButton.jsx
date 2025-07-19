import { ChevronIcon } from '~/icons/ChevronIcon';
import './BackButton.css';
import PropTypes from 'prop-types';

export const BackButton = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };
  return (
    <button type="button" onClick={handleClick} className="back_button">
      <ChevronIcon className="back_button__icon" />
      Back
    </button>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
