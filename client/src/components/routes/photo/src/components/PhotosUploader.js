import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import request from 'superagent'
import Dropzone from 'react-dropzone'
import { photosUploaded, updateUpload } from '../actions'
import UploadedPhotoStatusContainer from './UploadedPhotosStatus'

class PhotosUploader extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { uploadedPhotos: [] }
    this.photoId = 1
  }

  render() {
    return (
      <div>
        <Dropzone
          id="direct-upload-dropzone"
          disableClick={true}
          multiple={false}
          accept="image/*"
          style={{ position: 'relative' }}
          onDrop={this.onPhotoSelected.bind(this)}>
          <div id="direct_upload">
            <h1>New Photo</h1>
            <h2>Direct upload from the browser with React FileUpload</h2>
            <p>You can also drag and drop an image file into the dashed area.</p>
            <form>
              <div className="form_line">
                <label path="title">Title:</label>
                <div className="form_controls">
                  <input type="text" ref={titleEl => (this.titleEl = titleEl)} className="form-control" placeholder="Title" />
                </div>
              </div>
              <div className="form_line">
                <label>Image:</label>
                <div className="form_controls">
                  <div className="upload_button_holder">
                    <label className="upload_button" htmlFor="fileupload">Upload</label>
                    <input
                      type="file"
                      id="fileupload"
                      accept="image/*"
                      multiple="multiple"
                      ref={fileInputEl => (this.fileInputEl = fileInputEl)}
                      onChange={() => this.onPhotoSelected(this.fileInputEl.files)} />
                  </div>
                </div>
              </div>
            </form>
            <h2>Status</h2>
          </div>
          {this.props.uploadedPhotos.map((uploadedPhoto, index) => {
            return (
              <UploadedPhotoStatusContainer
                key={index}
                uploadedPhoto={uploadedPhoto} />
            )
          })}
        </Dropzone>
        <NavLink className="back_link" exact to="/photos">Back to list</NavLink>
      </div>
    )
  }

  onPhotoSelected(files) {
    const url = `https://api.cloudinary.com/v1_1/${this.context.cloudName}/upload`
    const title = this.titleEl.value

    for (let file of files) {
      const photoId = this.photoId++
      const fileName = file.name
      request.post(url)
        .field('upload_preset', this.context.uploadPreset)
        .field('file', file)
        .field('multiple', true)
        .field('public_id', title ? `medium_${title}` : `medium${photoId}`)
        .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
        .field('context', title ? `photo=${title}` : '')
        .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
        .end((err, res) => { this.onPhotoUploaded(photoId, fileName, res) })
    }
  }

  onPhotoUploadProgress(id, fileName, progress) {
    this.props.onUpdateUpload({
      id: id,
      fileName: fileName,
      progress: progress,
    })
  }

  onPhotoUploaded(id, fileName, response) {
    this.props.onUpdateUpload({
      id: id,
      fileName: fileName,
      response: response,
    })

    this.props.onPhotosUploaded([response.body])
  }
}

PhotosUploader.propTypes = {
  uploadedPhotos: PropTypes.array,
  onUpdateUpload: PropTypes.func,
  onPhotosUploaded: PropTypes.func,
}

PhotosUploader.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
}

const PhotosUploaderContainer = connect(
  state => state,
  {
    onUpdateUpload: updateUpload,
    onPhotosUploaded: photosUploaded,
  }
)(PhotosUploader)

Object.assign(
  PhotosUploaderContainer.contextTypes,
  PhotosUploader.contextTypes
)

export default PhotosUploaderContainer
