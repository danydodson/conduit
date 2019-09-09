/* eslint no-unused-vars: "off"*/
import React, { Component } from "react"
import { connect } from 'react-redux'
import Loading from '../../loading'
import UploaderStatus from './uploader-status'
import request from 'superagent'

import {
  UPLOADER_FORM_LOADED,
  UPLOADER_UPDATE_UPLOAD,
  UPLOADER_ITEMS_UPLOADED,
  UPLOADER_FORM_UNLOADED,
} from '../../../constants'

const post = process.env.REACT_APP_CL_POST
const preset = process.env.REACT_APP_CL_PRESET

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: UPLOADER_FORM_LOADED }),
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
    // this.setState({ uploaded: [...this.state.uploaded, response] })
    this.props.onUpdate({ id: id, fileName: fileName, response: response, })
    this.props.onUploaded([response.body])
  }

  handleUploads(files) {
    for (let file of files) {
      const uid = this.uid++
      const title = this.props.title
      const category = this.props.category
      const name = `${title}-${this.getRandomInt(999)}`
      request.post(post)
        .field('upload_preset', preset)
        .field('file', file)
        .field('name', file)
        .field('public_id', `${category}/${name}`)
        .field('multiple', true)
        .field('tags', [`${category},${title}`])
        .field('context', `title=${title}|category=${category}`)
        .on('progress', prog => this.onProgress(uid, name, prog))
        .end((err, res) => this.onUploaded(uid, name, res))
    }
  }

  render() {
    const { hover } = this.state
    const { loading } = this.props

    return (
      <div>

        <div
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          className={hover ? "drop-container hover" : "drop-container"}>

          <input
            type="file"
            id="fileupload"
            accept="image/*"
            multiple="multiple"
            ref={fileInputEl => this.fileInputEl = fileInputEl}
            onChange={() => this.handleUploads(this.fileInputEl.files)} />

          <div className='container'>

            <div className="drag-files">
              {loading ? <Loading /> : "Drag files to upload"}
            </div>

            <div className="response_wrap">
              {this.props.uploaded.map((upload, index) => {
                return (<UploaderStatus key={index} upload={upload} />)
              })}
            </div>

          </div>
        </div>


      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)