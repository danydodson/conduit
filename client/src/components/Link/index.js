import React, { Children } from 'react'
import Link from './Link'
import PropTypes from 'prop-types'

function Linkto(props) {

  const link = (
    <Link to={props.to}>
      {Children.toArray(props.children)}
    </Link>
  )

  return link
}

Linkto.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Linkto
