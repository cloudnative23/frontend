'use client'

import { memo, forwardRef, useImperativeHandle, useRef } from "react"

const RadioComponent = forwardRef(({ list, defaultValue }, _ref) => {

  const selectedIdRef = useRef(defaultValue)

  useImperativeHandle(_ref, () => ({ value: selectedIdRef }))

  return (<>
    {
      list.map(({ id, text }, key) => (
        <div key={key}>
          <input
            type='radio'
            id={id}
            className='hidden peer'
            onChange={(event) => { selectedIdRef.current = event.target.id }}
            name='hosting'
            defaultChecked={defaultValue == id}
          />
          <label
            htmlFor={id}
            className='flex justify-between mx-1 p-1 text-gray-500 bg-white rounded-lg peer-checked:bg-[#5284CF] peer-checked:text-white'
          >
            <div>{text}</div>
          </label>
        </div>
      ))}
  </>)
})

export default memo(RadioComponent)