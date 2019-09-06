import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

import {
  UPLOADER_DELETE_UPLOAD
} from '../../../utilities/constants'

const cname = process.env.REACT_APP_CLOUD_NAME

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onDelete: publicId =>
    dispatch({ type: UPLOADER_DELETE_UPLOAD, publicId }),
})

class UploaderStatus extends Component {

  deleteUpload() {
    request
      .post(`https://api.cloudinary.com/v1_1/${cname}/delete_by_token`)
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({ token: this.props.upload.response.body.delete_token })
      .then(this.onDeleteUpload.bind(this))
  }

  onDeleteUpload() {
    this.props.onDelete(
      this.props.upload.response.body.public_id
    )
  }

  render() {

    const upload = this.props.upload
    const response = upload.response
    const data = response && response.body
    const percent = Math.floor(upload.progress.percent)

    return (
      <div className='container'>

        {data && data.delete_token && (
          <button className="delete-image" onClick={this.deleteUpload.bind(this)}>Delete image</button>
        )}

        <div className="status">
          {!response && <span>{percent}%...</span>}
          {response && (
            <div className="status-code">Upload completed with status code{' '}{response.status}</div>
          )}
        </div>

        <div className="progress-bar">
          <div role="progressbar" className="progress" style={{ width: percent + '%' }} />
        </div>

        {data && <img width={200} height={200} alt={data.fileName} src={data.secure_url} />}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploaderStatus)