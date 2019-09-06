import {
  UPLOADER_FORM_LOADED,
  UPLOADER_FORM_UNLOADED,
  UPLOADER_UPDATE_UPLOAD,
  UPLOADER_DELETE_UPLOAD
} from '../utilities/constants'

export default (uploadedItems = [], action) => {
  switch (action.type) {

    case UPLOADER_FORM_LOADED:
    case UPLOADER_FORM_UNLOADED:
      return uploadedItems = []

    case UPLOADER_UPDATE_UPLOAD: {

      let uploadIndex = -1

      const updatedUploads = uploadedItems.map((uploadItem, id) => {

        if (uploadItem.id === action.upload.id) {
          uploadIndex = id

          return {
            ...uploadItem,
            ...action.upload
          }
        }

        return uploadItem
      })

      return uploadIndex !== -1
        ? updatedUploads
        : [action.upload, ...uploadedItems]
    }

    case UPLOADER_DELETE_UPLOAD: {

      const index = uploadedItems.findIndex(
        current =>
          current.response.body.public_id === action.publicId
      )

      return [
        ...uploadedItems.slice(0, index),
        ...uploadedItems.slice(index + 1),
      ]
    }

    default:
      return [...uploadedItems]
  }
}