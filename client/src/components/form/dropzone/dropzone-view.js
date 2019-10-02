import React from 'react'
import PropTypes from 'prop-types'

const Dropzone = ({
  uploads,
  onClick,
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave,
  hover,
  onChange,
  loading,
}) => {

  const previews = uploads.map((upload, id) => (
    !upload === upload ?
      null
      : <img
        draggable={false}
        width='100'
        key={id}
        src={upload.url}
        alt={upload.url}
        onClick={onClick} />
  ))
  return (
    <div
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={hover
        ? 'dropzone hover'
        : 'dropzone'}>
      <input
        onChange={onChange} />
      <div
        className='drag-files'>
        {loading
          ? 'loading'
          : 'Drag files to upload'}
      </div>
      <div
        className='response_wrap'>
        {previews}
      </div>
    </div>
  )
}

Dropzone.propTypes = {
  previews: PropTypes.func,
  uploads: PropTypes.array,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onChange: PropTypes.func,
}

export default Dropzone