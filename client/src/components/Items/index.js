import React from 'react';
import PropTypes from 'prop-types'
import { Item } from './Styles'

function Items(props) {
  return <Item>{props.item}</Item>
}

Items.propTypes = {
  item: PropTypes.any
}

export default Items
