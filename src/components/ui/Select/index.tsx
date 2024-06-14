type Option = {
  label: string;
  value: string;
};

type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
};

const Select = (props: Proptypes) => {
  const { label, name, defaultValue, disabled, options } = props;

  return (
    <div className="flex flex-col mt-1">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="p-1 bg-slate-300 rounded-sm focus:outline-none focus:border-none disabled:opacity-70"
      >
        {options.map((option) => {
          return (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
