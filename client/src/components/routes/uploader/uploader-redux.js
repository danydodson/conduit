import React, { Component } from "react"
import Loading from '../../shared/loading-image'
import { connect } from 'react-redux'
import request from 'superagent'
import Config from '../../../config'

import {
  UPLOADER_FORM_LOADED,
  UPLOADER_FORM_UNLOADED,
  UPLOADER_ITEM_UPDATED,
  UPLOADER_ITEM_UPLOADED
} from '../../../constants/types'

const mapStateToProps = state => ({ ...state.editor })

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: UPLOADER_FORM_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: UPLOADER_FORM_UNLOADED }),
  onUpdate: () =>
    dispatch({ type: UPLOADER_ITEM_UPDATED }),
  onUploaded: () =>
    dispatch({ type: UPLOADER_ITEM_UPLOADED }),
})

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.photoId = 1
    this.state = { uploads: [], hover: false }
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
    Math.floor(Math.random() * Math.floor(max))
  }

  onMediaSelect = files => {
    // eslint-disable-next-line
    for (let file of files) {
      const title = `img_${Math.floor(Math.random(999))}`
      const photoId = this.photoId++
      request.post(Config.CLOUD_POST_URL)
        .field('upload_preset', Config.CLOUD_PRESET)
        .field('file', file)
        .field('multiple', true)
        .field('public_id', `imgId_${this.getRandomInt(666)}`)
        .on('progress', (prog) => this.onProgress(photoId, file, prog))
        .end((err, res) => this.onUploaded(photoId, title, res))
    }
  }

  sendDeleteToken = (res, title, dtoken) => {
    if (res.body.public_id === title) {
      dtoken = res.body.delete_token
      request
        .post(Config.CLOUD_DELETE_URL)
        .set('Content-Type', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({ token: dtoken })
        .then(res => res)
    }
  }

  onProgress(id, file, progress) {
    console.log(id, file, progress)
    //this.props.onUpdate({ id: id, file: file, progress: progress, })
  }

  onUploaded(id, file, response) {
    console.log(id, file, response)
    //this.props.onUpdate({ id: id, file: file, response: response, })
    //this.props.onUploaded([response.body])
  }

  componentWillUnmount() { this.props.onUnload() }

  UNSAFE_componentWillMount() { this.props.onLoad() }

  render() {

    const { hover } = this.state
    const { loading } = this.props
    //const { upload } = this.props.upload

    //console.log(upload)
    //const upload = this.props.upload
    //const response = upload.response
    //const data = response && response.body

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
          <input
            multiple
            type="file"
            //ref={this.fileInputRef}
            onChange={() => this.onMediaSelect} />
          <div className="drag-files">
            {loading ? <Loading /> : "Drag files to upload"}
          </div>
        </div>
        <div className="response_wrap">
          {/* {this.props.upload.map((photo, id) => {
            return (
              <UploadContainer key={id} upload={photo} />
            )
          })} */}
        </div>

        <form>
          <label htmlFor="public_id">
            <input id="public_id" value={this.props.public_id} onChange={this.changePublicId} />
          </label>
          <label htmlFor="version">
            <input id="version" value={''} />
          </label>
          <label htmlFor="format">
            <input id="format" value={''} />
          </label>
          <label htmlFor="width">
            <input id="width" value={''} />
          </label>
          <label htmlFor="height">
            <input id="height" value={''} />
          </label>
          <label htmlFor="type">
            <input id="type" value={''} />
          </label>
          <label htmlFor="created_at">
            <input id="created_at" value={''} />
          </label>
          <label htmlFor="url">
            <input id="url" value={''} />
          </label>
          <label htmlFor="secure_url">
            <input id="secure_url" value={''} />
          </label>
          <label htmlFor="colors">
            <input id="colors" value={''} />
          </label>
          <label htmlFor="predominant">
            <input id="predominant" value={''} />
          </label>
          <label htmlFor="phash">
            <input id="phash" value={''} />
          </label>
          <label htmlFor="original_filename">
            <input id="original_filename" value={''} />
          </label>
          <label htmlFor="delete_token">
            <input id="delete_token" value={''} />
          </label>
          <button type="button" onClick={this.submitForm}>{'Submit'}</button>
        </form>

      </div>
    )
  }
}

export default Uploader = connect(mapStateToProps, mapDispatchToProps)(Uploader)