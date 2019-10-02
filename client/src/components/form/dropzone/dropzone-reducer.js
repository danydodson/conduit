import {
  DROPZONE_INPUT_ZONE_LOADED,
  DROPZONE_MEDIA_UPLOADED,
  DROPZONE_MEDIA_PROGRESS,
  DROPZONE_MEDIA_DELETED,
} from '../../../actions'

export default (uploads = [], action) => {
  switch (action.type) {

    case DROPZONE_INPUT_ZONE_LOADED: {
      return uploads = []
    }

    case DROPZONE_MEDIA_UPLOADED: {
      return [...action.uploads]
    }

    case DROPZONE_MEDIA_PROGRESS: {
      let upIndex = -1

      const updateList = uploads.map((uploadItem, index) => {
        if (uploadItem.id === action.upload.id) {
          upIndex = index
          return { ...uploadItem, ...action.upload }
        }
        return uploadItem
      })
      return upIndex !== -1
        ? updateList
        : [action.upload, ...uploads]
    }

    case DROPZONE_MEDIA_DELETED: {
      const index = uploads.findIndex(current =>
        current.public_id === action.publicId
      )

      return [
        ...uploads.slice(0, index),
        ...uploads.slice(index + 1)
      ]
    }

    default:
      return [...uploads]
  }
}