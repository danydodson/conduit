import {
  // UPLOADER_FORM_LOADED,
  UPLOADER_MEDIA_UPLOADED,
  UPLOADER_MEDIA_PROGRESS,
  UPLOADER_MEDIA_DELETED,
} from '../../../actions'

export default (uploads = [], action) => {
  switch (action.type) {

    // case UPLOADER_FORM_LOADED: {
    //   return uploads = []
    // }

    case UPLOADER_MEDIA_UPLOADED: {
      return [...action.uploads]
    }

    case UPLOADER_MEDIA_PROGRESS: {
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

    case UPLOADER_MEDIA_DELETED: {
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