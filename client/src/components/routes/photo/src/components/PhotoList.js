import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { photosUploaded } from '../actions'
import Photo from './Photo'
import Introduction from './Introduction'

class PhotoList extends Component {

  render() {

    return (
      <div className="photoList">
        <Introduction />
        <h1>Your Photos</h1>
        <div className="actions">
          <NavLink className="upload_link" exact to="/photos/new">Add photo with React File upload</NavLink>
        </div>
        <div className="photos">

          {this.props.photos.length === 0 && (
            <p>No photos were added yet.</p>)
          }

          {this.props.photos.map(photo => {
            return (
              <Photo
                key={photo.public_id}
                publicId={photo.public_id} />
            )
          })}
        </div>
      </div>
    )
  }
}

PhotoList.propTypes = {
  photos: PropTypes.array,
  onPhotosUploaded: PropTypes.func,
}

PhotoList.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
}

const PhotoListContainer = connect(
  state => ({ photos: state.photos }), { onPhotosUploaded: photosUploaded, }
)(PhotoList)

Object.assign(PhotoListContainer.contextTypes, PhotoList.contextTypes)

export default PhotoListContainer
