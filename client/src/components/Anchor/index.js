import React, { Children } from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import Anchor from './Anchor'

function Anchor(props) {

  let anchor = (
    <Anchor href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </Anchor>
  );

  return <Wrapper>{anchor}</Wrapper>
}

Button.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Anchor
