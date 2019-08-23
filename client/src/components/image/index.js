import React from 'react'
import PropTypes from 'prop-types'
import { UserImage } from './Styles'

function Image(props) {

  const image = (
    <UserImage src={props.src}>
      {props.children}
    </UserImage>
  )

  return image
}

Image.propTypes = {
  src: PropTypes.string
}

export default Image
