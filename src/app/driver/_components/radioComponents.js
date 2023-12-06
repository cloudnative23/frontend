const RadioComponent = ({ list, defaultValue, onChange, className }) => {

  return (<>
    {
      list.map(({ id, text }, key) => (
        <div key={key}>
          <input
            type='radio'
            id={id}
            className='hidden peer'
            name='hosting'
            defaultChecked={defaultValue == id}
            onChange={() => onChange(id)}
          />
          <label
            htmlFor={id}
            className={className}
          // className='flex justify-between mx-1 p-1 text-gray_dark bg-white rounded-lg peer-checked:bg-driver_dark peer-checked:text-white'
          >
            <div>{text}</div>
          </label>
        </div>
      ))}
  </>)
}

export default RadioComponent