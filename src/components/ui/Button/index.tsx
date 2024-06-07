type Propstypes = {
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    children: React.ReactNode;
}

const Button = (props: Propstypes) => {
    const { type, onClick, children } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-black text-white p-1 mt-2 rounded-sm"
    >
      {children}
    </button>
  );
};

export default Button;
