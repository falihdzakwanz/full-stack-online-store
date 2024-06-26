type PropTypes = {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = (props: PropTypes) => {
  const { type, onClick, children, className, disabled } = props;
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
