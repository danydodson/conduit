import React from 'react'

const Select = (props) => {
  return (
    <label htmlFor={props.name}>
      {props.title}
      <select
        name={props.name}
        value={props.value}
        onChange={props.handleChange}>
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option
              key={option}
              value={option}
              label={option}>
              {option}
            </option>
          )
        })}
      </select>
    </label>
  )
}
//new
export default Select