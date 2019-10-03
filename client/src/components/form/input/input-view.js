import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onKeyUp,
  tagsList,
  onClick,
}) => {

  const tags = tagsList || [].map(tag => {
    return (
      <span
        key={tag}>
        <span
          onClick={onClick(tag)} />
        {tag}
      </span>
    )
  })

  return (
    <Fragment>
      <fieldset className='form-group'>
        <input
          type={type}
          name={name}
          className='form-input'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </fieldset>
      <div>
        {tags}
      </div>
    </Fragment>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onClick: PropTypes.func,
  tagsList: PropTypes.array,
}

export default Input
