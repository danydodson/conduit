import React from 'react'
import { connect } from 'react-redux'
import Dropzone from '.'
import request from 'superagent'

import {
  DROPZONE_MEDIA_UPLOADED,
  DROPZONE_MEDIA_PROGRESS,
  DROPZONE_MEDIA_DELETED,
  TOASTIFY,
} from '../../../actions'

import {
  CLOUD_UPLOAD,
  CLOUD_PRESET,
  CLOUD_DELETE,
} from '../../configs/cloud-configs'

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
  showNotice: () =>
    dispatch({ type: TOASTIFY }),
})

class DropzoneArea extends React.Component {
  constructor(props) {
    super(props)

    this.photoId = 1

    this.state = {
      photoId: 1,
      hover: false,
      uploads: [] || null,
      error: '',
    }
  }

  componentWillMount() {
    this.props.onLoad()
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
    // this.checkMimeType(ev)
    this.onCloudinary(files)
    this.setState({ hover: false })
  }

  checkMimeType = (ev) => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const supported = fileTypes.indexOf(ev.dataTransfer.files[0].type) > -1
    return supported
      ? this.showPreview(ev)
      : toast.error(`${ev.dataTransfer.files[0].type} is not a supported format\n`)
  }

  showPreview = (ev) => {
    const reader = new FileReader()
    reader.readAsDataURL(ev.dataTransfer.files[0] || [])
    return reader.onload = ev => this.setState({ hover: false, uploads: [...this.state.uploads, ev.target.result] })
  }

  onProgress = (id, fileName, progress) => {
    this.props.onUpProgress({ id: id, fileName: fileName, progress: progress })
  }

  onUploaded = (id, fileName, response) => {
    this.props.onUpProgress({ id: id, fileName: fileName, response: response, })
    this.props.onUploaded([response.body])
  }

  onClearAllUploads = () => {
    this.setState({ upload: [] || null });
  }

  onClearUpload = ev => {
    const id = this.state.uploads.findIndex(uploads => uploads === ev.target.src)
    this.setState(state => {
      const uploads = state.uploads.slice(0, id).concat(state.uploads.slice(id + 1, state.uploads.length))
      return { uploads, }
    })
  }

  onCloudinary(files) {
    for (let file of files) {
      const photoId = this.photoId++
      const medium = this.props.medium
      const auth_email = this.props.app.currentUser.email
      const auth_name = this.props.app.currentUser.username
      const name = `${medium}_${this.getRandomInt(999)}`
      request
        .post(CLOUD_UPLOAD)
        .field('file', file)
        .field('upload_preset', CLOUD_PRESET)
        .field('public_id', `${name}`)
        .field('name', file)
        .field('folder', `${medium}`)
        .field('multiple', true)
        .field('tags', [`${medium}`])
        .field('context', `medium=${medium}|author_email=${auth_email}|author_name=${auth_name}`)
        .on('progress', progress => this.onProgress(photoId, file.name, progress))
        .end((err, response) => this.onUploaded(photoId, name, response))
    }
  }

  deleteUpload = () => {
    request
      .post(CLOUD_DELETE)
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({ token: this.props.uploads[0].delete_token })
      .then(this.onDeleteUpload.bind(this))
  }

  onDeleteUpload() {
    this.props.onDelete(
      this.props.uploads[0].public_id
    )

  }

  render() {
    return (
      <Dropzone
        uploads={this.props.uploads}
        onClick={this.deleteUpload}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        hover={this.state.hover}
        onChange={this.onCloudinary}
        loading={this.props.loading}
        info={this.props.info}
        errors={this.state.errors} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropzoneArea)
