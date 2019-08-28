import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import Config from '../../../config'
import { connect } from 'react-redux'
import request from 'superagent'
import { deleteUploadedPhoto } from '../photos/photos-actions'

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
    this.props.onDeleteUploadedPhoto(
      this.props.uploadedPhoto.response.body.public_id
    ).then((error, response) => console.log(`error${error} + error${response})`))
  }

  render() {

    const uploadedPhoto = this.props.uploadedPhoto
    const response = uploadedPhoto.response
    const data = response && response.body
    const percent = Math.floor(uploadedPhoto.progress.percent)

    return (
      <div>
        {/* <h3>{uploadedPhoto.fileName}</h3> */}
        <h3>
          {data && (
            <span>
              filename {uploadedPhoto.fileName}
              <hr></hr>
              public_id {data.public_id}
            </span>
          )
          }

        </h3>

        {data &&
          data.delete_token && (
            <button className="delete-image" onClick={this.deletePhoto.bind(this)}>Delete image</button>
          )}
        <div className="status">
          {!response && <div>Uploading... {percent}%</div>}
          {!response && <div>In progress</div>}
          {response && (
            <div className="status-code">Upload completed with status code{response.status}</div>
          )}
        </div>
        <div className="progress-bar">
          <div
            className="progress"
            role="progressbar"
            style={{ width: percent + '%' }}
          />
        </div>
        {data && (
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
        )}
      </div>
    )
  }
}

UploadedStatus.propTypes = {
  uploadedPhoto: PropTypes.object,
  onDeleteUploadedPhoto: PropTypes.func,
}

UploadedStatus.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
}

UploadedStatus = connect(state => state, { onDeleteUploadedPhoto: deleteUploadedPhoto })(UploadedStatus)

export default UploadedStatus
