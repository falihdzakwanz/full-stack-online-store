import { ChangeEvent } from "react";

type PropTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: PropTypes) => {
  const { label, name, type, placeholder, defaultValue, disabled, onChange } = props;

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
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
