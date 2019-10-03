import React from 'react'
import { connect } from 'react-redux'
import DropzoneView from './dropzone-view'
import request from 'superagent'
import crypto from 'crypto'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  DROPZONE_INPUT_ZONE_LOADED,
  DROPZONE_MEDIA_UPLOADED,
  DROPZONE_MEDIA_PROGRESS,
  DROPZONE_MEDIA_DELETED,
  TOAST_SUCCESS_NOTIFICATION,
  TOAST_INFO_NOTIFICATION,
  TOAST_ERROR_NOTIFICATION,
} from '../../../actions'

import {
  CLOUD_UPLOAD,
  CLOUD_SECRET,
  CLOUD_DESTROY,
  CLOUD_KEY,
} from '../../../configs'

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: DROPZONE_INPUT_ZONE_LOADED }),
  onUpProgress: upload =>
    dispatch({ type: DROPZONE_MEDIA_PROGRESS, upload }),
  onUploaded: uploads =>
    dispatch({ type: DROPZONE_MEDIA_UPLOADED, uploads }),
  onDelete: publicId =>
    dispatch({ type: DROPZONE_MEDIA_DELETED, publicId }),
  onToastSuccess: success =>
    dispatch({ type: TOAST_SUCCESS_NOTIFICATION, success }),
  onToastInfo: info =>
    dispatch({ type: TOAST_INFO_NOTIFICATION, info }),
  onToastError: error =>
    dispatch({ type: TOAST_ERROR_NOTIFICATION, error }),
})

class Dropzone extends React.Component {
  constructor() {
    super()
    this.photoId = 1
    this.loading = false
    this.state = {
      hover: false,
      uploads: [] || null,
    }
  }

  stopEvent = ev => {
    ev.preventDefault()
    ev.stopPropagation()
  }

  onDragEnter = ev => {
    this.stopEvent(ev)
  }

  onDragLeave = ev => {
    this.stopEvent(ev)
    this.setState({ hover: false })
  }

  onDragOver = ev => {
    this.stopEvent(ev)
    this.setState({ hover: true })
  }

  onDrop = ev => {
    this.stopEvent(ev)
    const { files } = ev.dataTransfer
    this.checkMimeType(ev, files)
    this.setState({ hover: false })
  }

  toastInfo = info => {
    this.props.onToastInfo(info)
    return toast.info(info)
  }

  toastSuccess = success => {
    this.props.onToastSuccess(success)
    return toast.success(success)
  }

  toastError = error => {
    this.props.onToastError(error)
    return toast.error(error)
  }

  checkMimeType = (ev, files) => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const supported = fileTypes.indexOf(ev.dataTransfer.files[0].type) > -1
    return supported
      ? this.onUpload(files)
      : this.toastError(`${ev.dataTransfer.files[0].type} is not a supported format\n`)
  }

  timestamp = () => {
    const millisecondsToSeconds = 1000;
    return Math.round(Date.now() / millisecondsToSeconds)
  }

  
  onUpload(files) {
    for (let file of files) {
      const time = this.timestamp()
      const photoId = this.photoId++
      const title = this.props.medium
      const sign = this.setSign('eager=w_200,h_200&public_id=' + title + '&timestamp=' + time + CLOUD_SECRET)
      // const auth_email = this.props.app.currentUser.email
      // const auth_name = this.props.app.currentUser.username
      request
        .post(CLOUD_UPLOAD)
        .field('file', file)
        .field('eager', 'w_200,h_200')
        .field('public_id', title)
        .field('timestamp', time)
        .field('api_key', CLOUD_KEY)
        .field('signature', sign)
        // .field('folder', `${medium}`)
        // .field('multiple', true)
        // .field('tags', [`${medium}`])
        // .field('context', `author_email=${auth_email}|author_name=${auth_name}`)
        .on('progress', progress => this.onProgress(photoId, file.name, progress))
        .end((error, response) => { error ? this.toastError(response.body.error.message) : this.onUploaded(photoId, file.name, response) })
    }
  }

  onProgress = (id, fileName, progress) => {
    this.loading = true
    this.props.onUpProgress({ id: id, fileName: fileName, progress: progress })
  }

  onUploaded = (id, fileName, response) => {
    this.loading = false
    this.props.onUpProgress({ id: id, fileName: fileName, response: response, })
    this.props.onUploaded([response.body])
    this.toastSuccess(`Your photo was uploaded\n`)
  }

  setSign = hash => {
    return crypto.createHash('sha1').update(hash, 'utf8').digest('hex')
  }

  deleteUpload = () => {
    const sign = this.setSign('public_id=' + this.props.uploads[0].public_id + '&timestamp=' + this.props.uploads[0].version + CLOUD_SECRET)
    const payload = CLOUD_DESTROY + 'public_id=' + this.props.uploads[0].public_id + '&timestamp=' + this.props.uploads[0].version + '&api_key=' + CLOUD_KEY + '&signature=' + sign
    request
      .del(payload)
      .on('response', res => { return res ? this.toastInfo(`Status: ${res.status} ${res.statusText}`) : null })
      .then(this.onDeleteUpload.bind(this))
  }

  onDeleteUpload = () => {
    this.props.onDelete(this.props.uploads[0].public_id)
    this.toastSuccess(`your upload was deleted\n`)
  }

  componentDidMount = () => {
    return this.props.medium
      ? this.props.onLoad()
      : null
  }

  render() {
    return (
      <DropzoneView
        uploads={this.props.uploads}
        loading={this.loading}
        onClick={this.deleteUpload}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        hover={this.state.hover}
        onChange={this.onUpload} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone)
