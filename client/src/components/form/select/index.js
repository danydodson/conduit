import React from 'react'
import PropTypes from 'prop-types'
import mediums from './mediums'

const Select = ({ value, onChange, info, errors, }) => {

  const selectOptions = mediums.map(option => (
    <option
      key={option}
      value={option}>
      {option}
    </option>
  ))

  return (
    <div
      className="form-group">
      <select
        value={value}
        className={!errors
          ? 'form-control'
          : 'is-invalid'}
        onChange={onChange}>
        {selectOptions}
      </select>
      {info && <small>{info}</small>}
      {errors && <div>{errors}</div>}
    </div>
  )
}

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  info: PropTypes.string,
  errors: PropTypes.array,
}

export default Select
