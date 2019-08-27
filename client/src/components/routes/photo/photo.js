import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'

import {
  PHOTO_PAGE_LOADED,
  PHOTO_PAGE_UNLOADED,
} from '../../../constants/types'

const mapStateToProps = state => ({
  ...state.photo,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: PHOTO_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: PHOTO_PAGE_UNLOADED })
})

class Photo extends Component {

  UNSAFE_componentWillMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div>
        <Helmet><title>Photo Page</title></Helmet>
        <Image publicId="sample" width="300" crop="scale" />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo)