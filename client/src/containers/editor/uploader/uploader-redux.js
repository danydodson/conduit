/* eslint no-unused-vars: "off"*/
import React, { Component } from "react"
import { connect } from 'react-redux'
import UploaderStatus from './uploader-status'
import Loading from '../../../components/loading'
import Errors from '../../../components/errors'
import request from 'superagent'
import crypto from 'crypto'

import {
  UPLOADER_FORM_LOADED,
  UPLOADER_UPDATE_UPLOAD,
  UPLOADER_ITEMS_UPLOADED,
  UPLOADER_FORM_UNLOADED,
} from '../../../utilities/constants'

const preset = process.env.REACT_APP_CLOUD_PRESET
const upload = process.env.REACT_APP_CLOUD_POST_URL
const ckey = process.env.REACT_APP_CLOUD_KEY
const csecret = process.env.REACT_APP_CLOUD_SECRET
const cresources = process.env.REACT_APP_CLOUD_RESOURCES
// const cl = new cloud.Cloudinary({ cloud_name: 'scenicloud' })
// <img alt='user' src={cl.url('sample')} />

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
    this.upid = 1
    this.state = { uploadedItems: [], hover: false }
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
  }

  stopEvent = ev => {
    ev.preventDefault()
    ev.stopPropagation()
  }

  onDragOver = ev => {
    this.stopEvent(ev)
    this.setState({ hover: true })
  }

  onDragLeave = ev => {
    this.stopEvent(ev)
    this.setState({ hover: false })
  }

  onDrop = ev => {
    this.stopEvent(ev)
    const { files } = ev.dataTransfer
    this.handleFiles(files)
    this.setState({ hover: false })
  }

  componentDidMount = () => {
    this.props.onLoad()
  }

  componentWillUnmount = () => {
    this.props.onUnload()
  }

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  onProgress = (id, fileName, progress) => {
    this.props.onUpdate({ id: id, fileName: fileName, progress: progress })
  }

  onUploaded = (id, fileName, response) => {
    this.props.onUpdate({ id: id, fileName: fileName, response: response, })
    this.props.onUploaded([response.body])
  }

  handleFiles = files => {
    for (let file of files) {
      const upid = this.upid++
      const title = this.props.title
      const category = this.props.category
      const name = `${title}-${this.getRandomInt(999)}`
      request.post(upload)
        .field('public_id', `${category}/${name}`)
        .field('upload_preset', preset)
        .field('file', file)
        .field('name', file)
        .field('multiple', true)
        .field('tags', [`${category},${title}`,])
        .field('context', `title=${title}.webp|category=${category}`)
        .on('progress', (prog) => this.onProgress(upid, name, prog))
        .end((err, res) => {
          //console.log(file)
          this.onUploaded(upid, name, res)
        })
    }
  }

  renameUpload() {
    const body = this.props.uploaded.response.body
    const signurl = `from_public_id=${body.public_id}&timestamp=${body.version}&to_public_id=${this.props.editor.title}${csecret}`
    let shasum = crypto.createHash('sha1')
    shasum.update(`${signurl}`)
    let sig = shasum.digest('hex')
    console.log(sig)
    request
      .post(`${cresources}/image/rename`)
      .set('from_public_id', `${body.public_id}`)
      .set('to_public_id', `${this.props.editor.title}`)
      .set('timestamp', `${body.version}`)
      .set('api_key', `${ckey}`)
      .set('signature', `${sig}`)
      //.set('signature', `${sig}`)
      .then(res => console.log(res))
  }


  render() {
    const { hover } = this.state
    const { loading } = this.props

    console.log('title' + this.props.editor.title)

    return (
      <div>

        <Errors errors={this.props.errors} />

        <div
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          className={hover ? "drop-container hover" : "drop-container"}>

          <input
            type="file"
            onChange={() => this.handleFiles} />

          <div className="drag-files">
            {loading ? <Loading /> : "Drag files to upload"}
          </div>
        </div>

        <div className="response_wrap">
          {this.props.uploaded.map((upload, index) => {
            return <UploaderStatus key={index} upload={upload} />
          })}
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)