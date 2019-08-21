import React from 'react'
import PropTypes from 'prop-types'
import NavList from './NavList'

function List(props) {
  return <NavList>{props.children}</NavList>
}

List.propTypes = {
  children: PropTypes.any
}

export default List
