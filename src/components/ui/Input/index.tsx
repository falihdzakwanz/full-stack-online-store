type Propstype = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};

const Input = (props: Propstype) => {
  const { label, name, type, placeholder } = props;

  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} name={name} id={name} placeholder={placeholder} />
    </div>
  );
};

export default Input;
