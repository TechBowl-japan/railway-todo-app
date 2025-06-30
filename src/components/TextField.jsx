import React from 'react';
import PropTypes from 'prop-types';
import './TextField.css';

export const Textfield = ({ children, id, type, onChange, autoComplete, value, mode }) => {
  return (
    <fieldset className="signup__form_field">
      <label
        htmlFor={`${id}-${autoComplete}`}
        autoComplete={autoComplete}
        className={`${mode}__form_label`}
      >
        {children}
      </label>
      <input
        id={`${id}-${autoComplete}`}
        type={type}
        className="app_input"
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
};

Textfield.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  value: PropTypes.string.isRequired,
  mode: PropTypes.string,
};
