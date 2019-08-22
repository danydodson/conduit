import React from 'react'
import PropTypes from 'prop-types'
import { List } from './Styles'

function Lists(props) {
  return <List>{props.children}</List>
}

List.propTypes = {
  children: PropTypes.any
}

export default Lists
