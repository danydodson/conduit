/* eslint no-unused-vars: "off"*/
import React, { Component, Fragment } from "react"
import { CLOUD_UPLOAD, CLOUD_PRESET } from '../../../configs/cloud-configs'
import { connect } from 'react-redux'
import Loading from '../../loading'
import Errors from '../../errors'
import DropzoneStatus from './dropzone-status'
// import crypto from 'crypto'

import request from 'superagent'

import {
  DROPZONE_FORM_LOADED,
  DROPZONE_MEDIA_PROGRESS,
  DROPZONE_MEDIA_UPLOADED,
  DROPZONE_FORM_ITEMS_UNLOADED,
} from '../../../actions'

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: DROPZONE_FORM_LOADED }),
  onUpdate: (upload) =>
    dispatch({ type: DROPZONE_MEDIA_PROGRESS, upload }),
  onUploaded: (uploads) =>
    dispatch({ type: DROPZONE_MEDIA_UPLOADED, uploads }),
  onUnload: () =>
    dispatch({ type: DROPZONE_FORM_ITEMS_UNLOADED }),
})

class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.uid = 1
    this.state = { uploaded: [], hover: false }
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
  }

  stopEvent(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  onDragOver(e) {
    this.stopEvent(e)
    this.setState({ hover: true })
  }

  onDragLeave(e) {
    this.stopEvent(e)
    this.setState({ hover: false })
  }

  onDrop(e) {
    this.stopEvent(e)
    const { files } = e.dataTransfer
    this.handleUploads(files)
    this.setState({ hover: false })
  }

  UNSAFE_componentWillMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  onProgress(id, fileName, progress) {
    this.props.onUpdate({ id: id, fileName: fileName, progress: progress })
  }

  onUploaded(id, fileName, response) {
    // this.setSignature(response.body.public_id, response.body.version)
    this.props.onUpdate({ id: id, fileName: fileName, response: response, })
    this.props.onUploaded([response.body])
  }

  handleUploads(files) {

    for (let file of files) {
      const uid = this.uid++
      const medium = this.props.medium
      // const auth_email = this.props.app.currentUser.email
      // const auth_name = this.props.app.currentUser.username
      const name = `${medium}_${this.getRandomInt(999)}`
      request.post(`${CLOUD_UPLOAD}`)
        .field('upload_preset', `${CLOUD_PRESET}`)
        .field('file', file)
        .field('public_id', `${name}`)
        // .field('name', file)
        // .field('folder', `${medium}`)
        // .field('multiple', true)
        // .field('tags', [`${medium}`])
        // .field('context', `medium=${medium}|author_email=${auth_email}|author_name=${auth_name}`)
        .on('progress', (progress) => this.onProgress(uid, name, progress))
        .end((err, response) => { this.onUploaded(uid, name, response) })
    }
  }

  render() {

    const { hover } = this.state
    const { loading } = this.props

    return (
      <Fragment>

        <Errors errors={this.props.errors} />

        <div
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          className={hover ? 'dropzone hover' : 'dropzone'}>

          <input
            type='file'
            id='fileupload'
            accept='image/*'
            multiple='multiple'
            ref={fileInputEl => this.fileInputEl = fileInputEl}
            onChange={() => this.handleUploads(this.fileInputEl.files)} />

          <div className='drag-files'>
            {loading ? <Loading /> : 'Drag files to upload'}
          </div>

          <div className='response_wrap'>
            {this.props.uploaded.map((upload, index) => {
              return <DropzoneStatus key={index} upload={upload} />
            })}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone)