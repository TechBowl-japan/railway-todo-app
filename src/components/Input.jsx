import "./Input.css"

export const Input = ({
  type,
  autoComplete,
  className = "app_input",
  value,
  onChange,
  onFocus,
  onBlur,
  id,
  placeholder,
  disabled,
}) => {
  return (
    <input
      type={type}
      autoComplete={autoComplete}
      className={className}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
