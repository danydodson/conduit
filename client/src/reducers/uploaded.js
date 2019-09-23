import {
  UPLOADER_UPDATE_UPLOAD,
  UPLOADER_DELETE_UPLOAD,
  UPLOADER_FORM_ITEMS_UNLOADED,
} from '../constants'

export default (uploaded = [], action) => {
  switch (action.type) {

    case UPLOADER_FORM_ITEMS_UNLOADED:
      return uploaded = []

    case UPLOADER_UPDATE_UPLOAD: {
      let upIndex = -1
      const updatedUploads = uploaded.map((uploadItem, index) => {
        if (uploadItem.id === action.upload.id) {
          upIndex = index
          return { ...uploadItem, ...action.upload }
        }
        return uploadItem
      })
      return upIndex !== -1 ? updatedUploads : [action.upload, ...uploaded]
    }

    case UPLOADER_DELETE_UPLOAD: {

      const index = uploaded.findIndex(current =>
        current.response.body.public_id === action.publicId
      )

      return [...uploaded.slice(0, index), ...uploaded.slice(index + 1)]
    }

    default:
      return [...uploaded]
  }
}