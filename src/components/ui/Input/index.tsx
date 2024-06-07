type Propstype = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};

const Input = (props: Propstype) => {
  const { label, name, type, placeholder } = props;

  return (
    <div className="flex flex-col mt-1">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="p-1 rounded-sm focus:outline-none focus:border-none"
      />
    </div>
  );
};

export default Input;
