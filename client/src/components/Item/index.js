import React from 'react';
import PropTypes from 'prop-types'
import { ListItem } from './Styles'

function Item(props) {
  return <ListItem>{props.item}</ListItem>
}

Item.propTypes = {
  item: PropTypes.any
}

export default Item
