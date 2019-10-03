import React from 'react'
import PropTypes from 'prop-types'
import mediums from './mediums'

const Select = ({ version, value, onChange, errors, }) => {

  const selectOptions = mediums.map(option => (
    <option
      key={option}
      value={option + '/' + option + '_' + version}>
      {option}
    </option>
  ))

  return (
    <fieldset className='form-group'>
      <select
        value={value}
        className={!errors
          ? 'form-control'
          : 'is-invalid'}
        onChange={onChange}>
        {selectOptions}
      </select>
    </fieldset>
  )
}

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.string,
}

export default Select
