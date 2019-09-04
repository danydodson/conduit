import React, { Component } from 'react'
import { deleteUpload } from './uploader-actions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'

// 200: OK | Success.  400: Bad request.  401: Authorization required. 
// 403: Not allowed.  404: Not found.  409: Already exists.  420: Rate limited. 

class UploadedStatus extends Component {

  deletePhoto() {
    request
      .post(`https://api.cloudinary.com/v1_1/scenicloud/delete_by_token`)
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({ token: this.props.uploadedPhoto.response.body.delete_token })
      .then(this.onDeletePhoto.bind(this))
  }

  onDeletePhoto() {
    this.props.onDeleteUpload(
      this.props.uploadedPhoto.response.body.public_id
    )
  }

  render() {

    const uploadedPhoto = this.props.uploadedPhoto
    const response = uploadedPhoto.response
    const data = response && response.body
    const percent = Math.floor(uploadedPhoto.progress.percent)

    return (
      <div>

        <h3>{data && (
          <span>filename {uploadedPhoto.fileName}
            <hr />public_id {data.public_id}
          </span>)}
        </h3>

        {data && data.delete_token && (
          <button
            className="delete-image"
            onClick={this.deletePhoto.bind(this)}>Delete image</button>
        )}

        <div className="status">
          {!response && <div>Uploading... {percent}%</div>}
          {!response && <div>In progress</div>}
          {response && (
            <div className="status-code">
              Upload completed with status code
              {response.status}
            </div>
          )}
        </div>

        <div className="progress-bar">
          <div
            role="progressbar"
            className="progress"
            style={{ width: percent + '%' }} />
        </div>

        {data && (
          <div>
            <div className="info">
              <table>
                <tbody>
                  {Object.keys(data).map(key => {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{JSON.stringify(data[key])}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div>
              <img src={data.secure_url} alt={data.fileName} height={300} width={300} />
              <li>{data.created_at}</li>
              <li>{data.version}</li>
            </div>

          </div>
        )}
      </div>
    )
  }
}

UploadedStatus.propTypes = {
  uploadedPhoto: PropTypes.object,
  onDeleteUpload: PropTypes.func,
}

UploadedStatus.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
}

UploadedStatus = connect(state => state, { onDeleteUpload: deleteUpload })(UploadedStatus)

export default UploadedStatus
