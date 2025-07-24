import "./Button.css"

export const Button = ({
  children,
  type = "submit",
  className = "app_button",
  disabled = false,
  variant,
  onClick,
  onFocus,
  onBlur,
}) => {
  return (
    <button
      type={type}
      className={className}
      data-variant={variant}
      disabled={disabled}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </button>
  )
}
