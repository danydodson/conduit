import React, { Children } from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import Btn from './Button'

function Button(props) {

  const button = (
    <Btn onClick={props.onClick}>
      {Children.toArray(props.children)}
    </Btn>
  )

  return <Wrapper>{button}</Wrapper>
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default Button
