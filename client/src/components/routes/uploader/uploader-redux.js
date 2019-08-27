import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'
//import Dropzone from 'react-dropzone'
import request from 'superagent'
import UploaderStatus from './uploader-status'

import {
  PHOTOS_UPLOADED,
  UPLOADER_PAGE_LOADED,
  UPLOADER_PAGE_UNLOADED
} from '../../../constants/types'

const mapStateToProps = state => ({
  ...state.photo,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: UPLOADER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: UPLOADER_PAGE_UNLOADED }),
  onPhotoUploaded: () =>
    dispatch({ type: PHOTOS_UPLOADED })
})

class Photo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { uploadedPhotos: [] }
    this.photoId = 1
  }

  UNSAFE_componentWillMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  onPhotoSelected(files) {
    const url = `https://api.cloudinary.com/v1_1/scenicloud/upload`
    const title = this.titleEl.value

    for (let file of files) {
      const photoId = this.photoId++
      const fileName = file.name
      request.post(url)
        .field('upload_preset', 'seesee-preset')
        .field('file', file)
        .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
        .field('context', title ? `photo=${title}` : '')
        .end((error, response) => { this.onPhotoUploaded(photoId, fileName, response) })
    }
  }

  onPhotoUploaded(response) {
    this.props.onPhotoUploaded()
  }

  render() {
    return (
      <div>
        <Helmet><title>Photo Page</title></Helmet>
        <Image publicId="sample" width="300" crop="scale" />
        {/* <Dropzone
          id="direct-upload-dropzone"
          disableClick={true}
          multiple={false}
          accept="image/*"
          style={{ position: 'relative' }}
          onDrop={this.onPhotoSelected.bind(this)}
        > */}
        <form>
          <label htmlFor="fileupload">Upload</label>
          <input
            type="text"
            ref={titleEl => (this.titleEl = titleEl)}
            placeholder="Title" />
          <input
            type="file"
            id="fileupload"
            accept="image/*"
            multiple="multiple"
            ref={fileInputEl => (this.fileInputEl = fileInputEl)}
            onChange={() => this.onPhotoSelected(this.fileInputEl.files)} />
        </form>
        {this.state.uploadedPhotos.map((uploadedPhoto, index) => {
          return (
            <UploaderStatus
              key={index}
              uploadedPhoto={uploadedPhoto} />
          )
        })}
        {/* </Dropzone> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo)