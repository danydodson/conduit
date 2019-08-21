import React, { Children } from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import Button from './Button'

function Button(props) {

  const button = (
    <Button onClick={props.handleRoute}>
      {Children.toArray(props.children)}
    </Button>
  )
  
  return <Wrapper>{button}</Wrapper>
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default Button
