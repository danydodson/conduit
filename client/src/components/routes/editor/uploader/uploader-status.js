import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

class UploaderStatus extends Component {

  // sendDeleteToken = (res, title, dtoken) => {
  //   if (res.body.public_id === title) {
  //     dtoken = res.body.delete_token
  //     request
  //       .post(Config.CLOUD_DELETE_URL)
  //       .set('Content-Type', 'application/json')
  //       .set('X-Requested-With', 'XMLHttpRequest')
  //       .send({ token: dtoken })
  //       .then(res => res)
  //   }
  // }


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
            onClick={this.deletePhoto.bind(this)}>Delete image</button>
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

  deletePhoto() {
    request
      .post(`https://api.cloudinary.com/v1_1/scenicloud/delete_by_token`)
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({ token: this.props.upload.response.body.delete_token })
      .then(this.onDeletePhoto.bind(this))
  }

  // onDeletePhoto() {
  //   this.props.onDeleteUpload(
  //     this.props.upload.response.body.public_id
  //   )
  // }

}

export default UploaderStatus = connect(state => state, {})(UploaderStatus)
