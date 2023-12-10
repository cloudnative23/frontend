const RadioComponent = ({
  list,
  defaultValue,
  onChange,
  className,
  disabled = false,
}) => {
  return (
    <>
      {list.map(({ id, text }, key) => (
        <div key={key}>
          <input
            type="radio"
            id={id}
            className="peer hidden"
            name="hosting"
            defaultChecked={defaultValue == id}
            onChange={() => onChange(id)}
            disabled={disabled}
          />
          <label htmlFor={id} className={className}>
            <div>{text}</div>
          </label>
        </div>
      ))}
    </>
  );
};

export default RadioComponent;
