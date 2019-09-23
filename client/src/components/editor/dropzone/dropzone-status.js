import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

import { CLOUD_DELETE } from '../../../configs/cloud-configs'
import { UPLOADER_DELETE_UPLOAD } from '../../../constants'

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onDelete: publicId =>
    dispatch({ type: UPLOADER_DELETE_UPLOAD, publicId }),
})

class DropzoneStatus extends Component {

  deleteUpload() {
    request
      .post(CLOUD_DELETE)
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

    const upload = this.props.uploaded
    const response = upload.response
    const data = response && response.body
    const percent = Math.floor(upload.progress.percent)

    return (
      <div className='container'>
        {data && data.delete_token && (
          <button
            className="delete-image"
            onClick={this.deleteUpload.bind(this)}>
            {data && <img
              className='preview'
              alt={data.fileName}
              src={data.secure_url} />}
          </button>
        )}
        <div className="status">
          {!response &&
            <div>
              {percent}{'%...'}
              <div
                role="progressbar"
                className="progress progress-bar"
                style={{ width: percent + '%' }}>
              </div>
            </div>}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropzoneStatus)