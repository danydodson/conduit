import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { StyledLink } from './Styles'

function Link(props) {

  const link = (
    <StyledLink to={props.to}>
      {Children.toArray(props.children)}
    </StyledLink>
  )

  return link
}

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Link
