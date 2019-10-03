import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({
  type,
  name,
  rows,
  placeholder,
  value,
  onChange
}) => {
  return (
    <fieldset className='form-group'>
      <textarea
        type={type}
        name={name}
        rows={rows}
        className='form-control'
        placeholder={placeholder}
        value={value}
        onChange={onChange}>
      </textarea>
    </fieldset>
  )
}

TextArea.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextArea
