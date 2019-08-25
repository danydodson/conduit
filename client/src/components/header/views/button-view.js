import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { NavButton } from './button-syles'

function Button(props) {

  const button = (
    <NavButton onClick={props.onClick}>
      {Children.toArray(props.children)}
    </NavButton>
  )

  return button
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default Button
