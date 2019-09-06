import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

import {
  UPLOADER_DELETE_UPLOAD
} from '../../../../constants'

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onDelete: publicId =>
    dispatch({ type: UPLOADER_DELETE_UPLOAD, publicId }),
})

class UploaderStatus extends Component {
  render() {

    const upload = this.props.upload
    const response = upload.response
    const data = response && response.body
    const percent = Math.floor(upload.progress.percent)

    return (
      <div className='container'>

        {data && data.delete_token && (
          <button
            className="delete-image"
            onClick={this.deleteUpload.bind(this)}>Delete image</button>
        )}

        <div className="status">

          {!response && <div>Uploading in progress...{percent}%</div>}

          {response && (
            <div className="status-code">
              Upload completed with status code
              {' '}{response.status}
            </div>
          )}

        </div>

        <div className="progress-bar">
          <div
            role="progressbar"
            className="progress"
            style={{ width: percent + '%' }}>
          </div>
        </div>

        {data && (
          <img src={data.secure_url} alt={data.fileName} height={200} width={200} />
        )}

      </div>
    )
  }

  deleteUpload() {
    request
      .post(`https://api.cloudinary.com/v1_1/scenicloud/delete_by_token`)
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

}

export default UploaderStatus = connect(mapStateToProps, mapDispatchToProps)(UploaderStatus)