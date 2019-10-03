import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({
  label,
  name,
  checked,
  value,
  onChange
}) => {

  return (
    <fieldset className='form-group'>
      {label}
      <input
        type='checkbox'
        name={name}
        className='form-input'
        checked={checked}
        value={value}
        onChange={onChange} />
    </fieldset>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.bool,
  onChange: PropTypes.func
}

export default Checkbox
