import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

import {
  UPLOADER_DELETE_UPLOAD
} from '../../../utilities/constants'

const cname = process.env.REACT_APP_CL_NAME

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
      <div className='container preview-box'>

        {data && data.delete_token && (
          <button
            className="delete-image"
            onClick={this.deleteUpload.bind(this)}>
            <h3>X</h3>
          </button>
        )}

        <div className="status">
          {!response &&
            <div>
              {percent}{'%...'}
              <div
                role="progressbar"
                className="progress progress-bar"
                style={{ width: percent + '%' }}
              />
            </div>
          }
        </div>

        <div>
          {data && <img
            className='preview'
            alt={data.fileName}
            src={data.secure_url} />}
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploaderStatus)