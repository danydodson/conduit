import React, { Component } from "react"
import PropTypes from "prop-types"
import Loading from "./uploader-loading"
import Config from '../../../config'
import { connect } from 'react-redux'
import request from 'superagent'
import { photosUploaded, updateUploadedPhoto } from '../photos/photos-actions'
import UploaderStatus from './uploader-status'
import "./index.css"

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

  openFileDialog() {
    this.fileInputRef.current.click()
  }

  onFilesAdded(event) {
    const { files } = event.target
    this.props.onFilesAdded(this.fileListToArray(files))
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
    this.props.onFilesAdded(this.fileListToArray(files))
    this.setState({ hover: false })
  }

  stopEvent(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  fileListToArray(list) {
    // eslint-disable-next-line
    for (let i = 0; i < list.length; i++) {
      const url = `https://api.cloudinary.com/v1_1/${Config.cloud_name}/upload`
      const photoId = this.photoId++
      const title = 'title_' + photoId
      const fileName = list.item(i).name
      //result.push(list.item(i))
      request.post(url)
        .field('upload_preset', 'seesee')
        .field('file', list.item(i))
        .field('multiple', true)
        .field('public_id', title ? `medium_${title}` : `medium${photoId}`)
        .field('tags', title ? `seesee,${title}` : 'seesee')
        .field('context', title ? `photo=${title}` : '')
        .on('progress', progress => this.onPhotoUploadProgress(photoId, list.item(i), progress))
        .end((err, res) => this.onPhotoUploaded(photoId, fileName, res))
    }
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
            //ref={fileInputEl => (this.fileInputEl = fileInputEl)}
            onChange={() => this.onFilesAdded}
          />
          <div className="drag-files">
            {loading ? <Loading /> : "Drag files to upload"}
          </div>
        </div>
        <div className="response_wrap">
          {
            this.props.uploaded.map((photo, id) => {
              return (
                <UploaderStatus
                  key={id}
                  uploadedPhoto={photo} />
              )
            })
          }
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

