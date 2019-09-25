import React from 'react'
import PropTypes from 'prop-types'

const SelectListGroup = ({
  id,
  value,
  error,
  info,
  onChange,
  options
}) => {

  const selectOptions = options.map(option => (

    <option key={option} value={option}>
      {option}
    </option>
  ))

  return (
    <div className="form-group">
      <select
        id={id}
        value={value}
        className={!error ? 'form-control' : 'is-invalid'}
        onChange={onChange}>
        {selectOptions}
      </select>

      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}

    </div>
  )
}

SelectListGroup.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectListGroup
