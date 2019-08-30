import React, { Component } from "react"
import { photosUploaded, updateUpload } from './uploader-actions'
import PropTypes from "prop-types"
import Data from './uploader-form'
import Loading from "../../global/loading"
import Config from '../../../config'
import request from 'superagent'
import UploaderStatus from './uploader-status'
import { connect } from 'react-redux'

import {
  UPLOADER_PAGE_LOADED,
  UPLOADER_PAGE_UNLOADED
} from '../../../constants/types'

const mapStateToProps = state => ({ ...state.editor })

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: UPLOADER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: UPLOADER_PAGE_UNLOADED }),
})

// onFilesAdded(files) 
// Triggered after files are uploaded.

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


  // Handle adding files through file dialog

  onFilesAdded(event) {
    const { files } = event.target
    this.props.onFilesAdded(this.filesToArray(files))
    this.fileListToArray(files)
  }


  // Handle file being dragged over drag area

  onDragOver(event) {
    this.stopEvent(event)
    this.setState({ hover: true })
  }


  // Handle file being dragged out of drag area

  onDragLeave(event) {
    this.stopEvent(event)
    this.setState({ hover: false })
  }


  // Handle file dropped into drag area

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
    const url = `${Config.cloudPostUrl}`
    // eslint-disable-next-line
    for (let i = 0; i < list.length; i++) {
      const photoId = this.photoId++
      const title = 'title_' + photoId
      const fileName = list.item(i).name
      request.post(url)
        .field('upload_preset', `${Config.cloudPreset}`)
        .field('file', list.item(i))
        .field('multiple', true)
        .field('public_id', `users_${this.getRandomInt(666)}`)
        .field('tags', title ? `seesee,${title}` : 'seesee')
        .field('context', title ? `photo=${title}` : '')
        .on('progress', progress => this.onPhotoUploadProgress(photoId, list.item(i), progress))
        .end((err, res) => this.onPhotoUploaded(photoId, fileName, res))
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

  // Opens file system dialog

  openFileDialog() {
    this.fileInputRef.current.click()
  }


  // Prevent default event

  stopEvent(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  UNSAFE_componentWillMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload()
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
          className={hover
            ? "drop-zone-container hover"
            : "drop-zone-container"}>

          <input type="text"
            ref={title => (this.title = title)}
            className="form-control"
            placeholder="Title" />

          <input
            ref={this.fileInputRef}
            type="file"
            multiple
            onChange={() => this.onFilesAdded} />

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
              <Data key={id} uploadedPhoto={photo} />
            )
          })}
        </div>

      </div>
    )
  }
}

Uploader.propTypes = {
  uploadedPhotos: PropTypes.array,
  onUpdateUpload: PropTypes.func,
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

Uploader = connect(state => state, { onUpdateUpload: updateUpload, onPhotosUploaded: photosUploaded, })(Uploader)

Uploader = connect(mapStateToProps, mapDispatchToProps)(Uploader)

export default Uploader

