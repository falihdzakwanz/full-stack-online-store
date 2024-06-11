type Propstypes = {
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    className: string;
    children: React.ReactNode;
}

const Button = (props: Propstypes) => {
    const { type, onClick, children, className } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
