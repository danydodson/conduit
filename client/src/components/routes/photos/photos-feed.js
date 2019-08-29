import React, { Component } from 'react'
import { connect } from 'react-redux'
//import Config from '../../../config'
import { NavLink } from 'react-router-dom'
import { fetchPhotos } from '../../../config/cloudinary'
import { photosUploaded, photosFetched } from './actions'
import Photo from '../photo'

import {
  PHOTOS_PAGE_LOADED,
  PHOTOS_PAGE_UNLOADED,
} from '../../../constants/types'

const mapStateToProps = state => ({
  ...state.photo,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: PHOTOS_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: PHOTOS_PAGE_UNLOADED })
})

class PhotoList extends Component {
  componentDidMount() {
    fetchPhotos('scenicloud')
      .then(this.props.onPhotosFetched)
  }

  UNSAFE_componentWillMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div className="container">

        <div className="photoList">
          <h1>Your Photos</h1>

          <div className="actions">
            <NavLink className="upload_link" exact to="/uploader">Add photo with React File upload</NavLink>
          </div>

          <div className="photos">

            {this.props.photos.length
              === 0
              && (<p>No photos were added yet.</p>)
            }

            {this.props.photos.map(
              photo => {
                return (<Photo
                  key={photo.public_id}
                  publicId={photo.public_id} />
                )
              })
            }

          </div>
        </div>
      </div>
    )
  }
}


PhotoList = connect(state => ({ photos: state.photos }), { onPhotosUploaded: photosUploaded, })(PhotoList)

PhotoList = connect(null, { onPhotosFetched: photosFetched })(PhotoList)

PhotoList = connect(mapStateToProps, mapDispatchToProps)(PhotoList)

export default PhotoList
