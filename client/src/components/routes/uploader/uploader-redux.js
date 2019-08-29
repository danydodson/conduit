import React, { Component } from "react"
import { photosUploaded, updateUploadedPhoto } from '../photos/photos-actions'
import PropTypes from "prop-types"
import ForMongo from './uploader-mongodb'
import Loading from "./images/loading"
import Config from '../../../config'
import request from 'superagent'
import UploaderStatus from './uploader-status'
import { connect } from 'react-redux'

import "./styles/index.css"

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.photoId = 1
    this.state = { uploaded: [], hover: false }
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.fileInputRef = React.createRef()
  }

  onFilesAdded(event) {
    const { files } = event.target
    this.props.onFilesAdded(this.filesToArray(files))
    this.fileListToArray(files)
  }

  onDragOver(event) {
    this.stopEvent(event)
    this.setState({ hover: true })
  }

  onDragLeave(event) {
    this.stopEvent(event)
    this.setState({ hover: false })
  }

  onDrop(event) {
    this.stopEvent(event)
    const { files } = event.dataTransfer
    console.log(files)
    this.props.onFilesAdded(this.fileListToArray(files))
    this.setState({ hover: false })
  }

  getRandomInt(max) {
    Math.floor(Math.random() * Math.floor(max))
  }

  fileListToArray(list) {
    // eslint-disable-next-line
    for (let i = 0; i < list.length; i++) {
      const url = `https://api.cloudinary.com/v1_1/${Config.cloud_name}/upload`
      const photoId = this.photoId++
      const title = 'title_' + photoId
      const fileName = list.item(i).name
      request.post(url)
        .field('upload_preset', `${Config.upload_preset}`)
        .field('file', list.item(i))
        .field('public_id', `testing/users_${this.getRandomInt(666)}`)
        .field('multiple', true)
        .field('tags', title ? `user,${title}` : 'user')
        .field('context', title ? `photo=${title}` : '')
        .on('progress', progress => this.onPhotoUploadProgress(photoId, list.item(i), progress))
        .end((err, res) => this.onPhotoUploaded(photoId, fileName, res))
    }
  }

  filesToArray(list) {
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push(list.item(i));
    }
    return result;
  }

  onPhotoUploadProgress(id, fileName, progress) {
    this.props.onUpdateUploadedPhoto({
      id: id,
      fileName: fileName,
      progress: progress,
    })
  }

  onPhotoUploaded(id, fileName, response) {
    this.props.onUpdateUploadedPhoto({
      id: id,
      fileName: fileName,
      response: response,
    })

    this.props.onPhotosUploaded([response.body])
  }

  openFileDialog() {
    this.fileInputRef.current.click()
  }

  stopEvent(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  render() {

    const { hover } = this.state
    const { loading } = this.props

    return (
      <div>
        <div
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          onClick={this.openFileDialog}
          className={hover ? "drop-zone-container hover" : "drop-zone-container"}>
          <input type="text"
            ref={title => (this.title = title)}
            className="form-control"
            placeholder="Title" />
          <input
            ref={this.fileInputRef}
            type="file"
            multiple
            onChange={() => this.onFilesAdded}
          />
          <div className="drag-files">
            {loading ? <Loading /> : "Drag files to upload"}
          </div>
        </div>
        <div className="response_wrap">
          {this.props.uploaded.map((photo, id) => {
            return (
              <UploaderStatus key={id} uploadedPhoto={photo} />
            )
          })}

          {this.props.uploaded.map((photo, id) => {
            return (
              <ForMongo key={id} uploadedPhoto={photo} />
            )
          })}
        </div>

      </div>
    )
  }
}

Uploader.propTypes = {
  uploadedPhotos: PropTypes.array,
  onUpdateUploadedPhoto: PropTypes.func,
  onPhotosUploaded: PropTypes.func,
  onFilesAdded: PropTypes.func,
  loading: PropTypes.bool
}

Uploader.defaultProps = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
  onFilesAdded: () => null,
  loading: false
}

Uploader = connect(state => state, { onUpdateUploadedPhoto: updateUploadedPhoto, onPhotosUploaded: photosUploaded, })(Uploader)

export default Uploader

