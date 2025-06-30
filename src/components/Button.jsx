export const Button = ({ children, type, disabled }) => {
  return (
    <button type={type} className="app_button" disabled={disabled}>
      {children}
    </button>
  );
};
s;
