import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Dropzone = ({
  info,
  error,
  input,
  hover,
  onDrop,
  loading,
  handleUpload,
  onDragOver,
  onDragLeave,
  // uploads,
}) => {

  // const activeUpload = uploads.map(upload => (
  //   <div key={upload.index} upload={upload}>
  //     {upload}
  //   </div>
  // ))

  return (
    <Fragment>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={hover ? 'dropzone hover' : 'dropzone'}>

        <input
          type='file'
          id='fileupload'
          accept='image/*'
          multiple='multiple'
          ref={input}
          onChange={handleUpload} />

        <div className='drag-files'>
          {loading ? '<Loading />' : 'Drag files to upload'}
        </div>

        <div className='response_wrap'>
          {/* {activeUpload} */}
        </div>

      </div>

      {info && <small className="form text-muted">{info}</small>}
      {error && <div className="invalid">{error}</div>}

    </Fragment>
  )
}

Dropzone.propTypes = {
  uploads: PropTypes.array,
  public_id: PropTypes.string,
  medium: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
}

export default Dropzone
