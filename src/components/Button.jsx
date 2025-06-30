import PropTypes from 'prop-types';

export const Button = ({ children, type, disabled }) => {
  return (
    <button type={type} className="app_button" disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};
