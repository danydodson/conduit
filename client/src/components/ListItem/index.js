import React from 'react';
import PropTypes from 'prop-types'
import Item from './ListItem'

function ListItem(props) {
  return <Item>{props.item}</Item>
}

ListItem.propTypes = {
  item: PropTypes.any
}

export default ListItem
