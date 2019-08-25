import React from 'react'
import PropTypes from 'prop-types'
import AnchorLink from './anchor-styles'

function Anchor(props) {

  let anchor = (
    <AnchorLink href={props.href} onClick={props.onClick}>
      {props.children}
    </AnchorLink>
  );

  return anchor
}

Button.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default Anchor
