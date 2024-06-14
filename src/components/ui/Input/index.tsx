type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: Proptypes) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;

  return (
    <div className="flex flex-col mt-1">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="p-1 bg-slate-300 rounded-sm focus:outline-none focus:border-none disabled:opacity-70"
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
