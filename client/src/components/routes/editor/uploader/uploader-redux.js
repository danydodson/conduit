import React, { Component } from "react"
import { connect } from 'react-redux'
import Loading from '../../../shared/loading-image'
import Config from '../../../../config'
import request from 'superagent'
import UploaderStatus from './uploader-status';

import {
  UPLOADER_UPDATE_UPLOAD,
  UPLOADER_ITEMS_UPLOADED,
  UPLOADER_FORM_UNLOADED,
} from '../../../../actions/actions-types'

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onUpdate: (upload) =>
    dispatch({ type: UPLOADER_UPDATE_UPLOAD, upload }),
  onUploaded: (uploads) =>
    dispatch({ type: UPLOADER_ITEMS_UPLOADED, uploads }),
  onUnload: () =>
    dispatch({ type: UPLOADER_FORM_UNLOADED }),
})

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.uploadId = 1
    this.state = { uploadedItems: [], hover: false }
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.openFileDialog = this.openFileDialog.bind(this)
    this.fileInputRef = React.createRef()
  }

  openFileDialog() { }

  stopEvent(event) {
    event.preventDefault()
    event.stopPropagation()
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
    this.onMediaSelect(files)
    this.setState({ hover: false })
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  onMediaSelect = files => {
    // eslint-disable-next-line
    for (let file of files) {
      const fileName = `img_id_${this.getRandomInt(999)}`
      const uploadId = this.uploadId++
      request.post(Config.CLOUD_POST_URL)
        .field('upload_preset', Config.CLOUD_PRESET)
        .field('file', file)
        .field('multiple', true)
        .field('public_id', fileName)
        .field('context', `photo_name=${fileName}`)
        .on('progress', (progress) => this.onItemProgress(uploadId, fileName, progress))
        .end((err, response) => this.onItemUploaded(uploadId, fileName, response))
    }
  }

  onItemProgress(id, fileName, progress) {
    console.log(id, fileName, progress)
    this.props.onUpdate({
      id: id,
      fileName: fileName,
      progress: progress,
    })
  }

  onItemUploaded(id, fileName, response) {
    console.log(id, fileName, response)
    this.props.onUpdate({
      id: id,
      fileName: fileName,
      response: response,
    })

    this.props.onUploaded([response.body])
  }

  componentWillUnmount() { this.props.onUnload() }

  render() {
    const { hover } = this.state
    const { loading } = this.props

    return (
      <div>
        <div
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          onClick={this.openFileDialog}
          onDragLeave={this.onDragLeave}
          className={hover
            ? "drop-zone-container hover container"
            : "drop-zone-container container"}>
          <input
            multiple
            type="file"
            onChange={() => this.onMediaSelect} />
          <div className="drag-files">
            {loading ? <Loading /> : "Drag files to upload"}
          </div>
        </div>
        <div className="response_wrap">
          {
            this.props.uploaded.map((upload, index) => {
              return (
                <UploaderStatus
                  key={index}
                  upload={upload} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Uploader = connect(mapStateToProps, mapDispatchToProps)(Uploader)