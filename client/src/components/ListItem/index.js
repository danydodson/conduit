import React from 'react';
import PropTypes from 'prop-types'
import Item from './Item'

function ListItem(props) {
  return <Item>{props.item}</Item>
}

ListItem.propTypes = {
  item: PropTypes.any
}

export default ListItem
