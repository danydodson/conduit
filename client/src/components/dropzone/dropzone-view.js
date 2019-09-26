import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Dropzone = ({
  handleUpload,
  onDragEnter,
  onDragLeave,
  onDragOver,
  loading,
  error,
  input,
  className,
  info,
  onDrop,
  accept,
  upload,
  uploads,
}) => {

  const previews = uploads || [].map(upload => (
    <img src={upload} key={upload.index} width='300' alt={upload} />
  ))

  return (
    <Fragment>
      <div
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={className}>
        <input
          type='file'
          id='fileupload'
          accept={accept}
          multiple='multiple'
          ref={input}
          onChange={handleUpload} />
        <div className='drag-files'>
          {loading ? '<Loading />' : 'Drag files to upload'}
        </div>
        <div className='response_wrap'>
          <img src={upload} width='300' alt={upload} />
          {previews}
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