import React from 'react'
import { connect } from 'react-redux'
import DropzoneView from './dropzone-view'
import request from 'superagent'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  DROPZONE_INPUT_ZONE_LOADED,
  DROPZONE_MEDIA_UPLOADED,
  DROPZONE_MEDIA_PROGRESS,
  DROPZONE_MEDIA_DELETED,
} from '../../../actions'

import {
  CLOUD_UPLOAD,
  CLOUD_PRESET,
  CLOUD_DELETE,
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
})

class Dropzone extends React.Component {
  constructor() {
    super()
    this.photoId = 1
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

  checkMimeType = (ev, files) => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const supported = fileTypes.indexOf(ev.dataTransfer.files[0].type) > -1
    return supported
      ? this.onUpload(files)
      : toast.error(`${ev.dataTransfer.files[0].type} is not a supported format\n`)
  }

  onUpload(files) {
    for (let file of files) {
      const photoId = this.photoId++
      const title = this.props.medium
      // const auth_email = this.props.app.currentUser.email
      // const auth_name = this.props.app.currentUser.username
      request
        .post(CLOUD_UPLOAD)
        .field('file', file)
        .field('upload_preset', CLOUD_PRESET)
        .field('public_id', `${title}`)
        // .field('name', file)
        // .field('folder', `${medium}`)
        .field('multiple', true)
        // .field('tags', [`${medium}`])
        // .field('context', `author_email=${auth_email}|author_name=${auth_name}`)

        .on('progress', progress => {
          console.log(progress)
          this.onProgress(photoId, file.name, progress)
        })

        .end((err, response) => {
          err
            ? this.getErrors(response)
            : this.onUploaded(photoId, file.name, response)
        })
    }
  }

  getErrors = (response) => {
    console.log(response)
    toast.error(`${response.body.error.message}`)
  }

  onProgress = (id, fileName, progress) => {
    this.props.onUpProgress({ id: id, fileName: fileName, progress: progress })
  }

  onUploaded = (id, fileName, response) => {
    toast.info(`your photo was uploaded\n`)
    this.props.onUpProgress({ id: id, fileName: fileName, response: response, })
    this.props.onUploaded([response.body])
  }

  deleteUpload = () => {
    request
      .post(CLOUD_DELETE)
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({ token: this.props.uploads[0].delete_token })
      .on('progress', progress => {
        if (progress.target.status === 420) {
          toast.error(`${progress.target.statusText} \n`)
          // console.log(progress)
        }
      })
      .then(
        this.onDeleteUpload.bind(this)
      )
  }

  onDeleteUpload = () => {
    this.props.onDelete(
      this.props.uploads[0].public_id
    )
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <DropzoneView
        uploads={this.props.uploads}
        onClick={this.deleteUpload}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        hover={this.state.hover}
        onChange={this.onUpload}
        loading={this.props.loading} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone)
