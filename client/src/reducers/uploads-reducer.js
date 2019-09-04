import {
  // UPLOADER_FORM_LOADED,
  // UPLOADER_FORM_UNLOADED,
  UPLOADER_ITEM_UPDATED,
  UPLOADER_ITEM_DELETED
} from '../constants/types'

export default (state = {}, uploads = [], action) => {
  switch (action.type) {

    // case UPLOADER_FORM_LOADED:
    //   return uploads = []

    // case UPLOADER_FORM_UNLOADED: {
    //   return uploads = []
    // }

    case UPLOADER_ITEM_UPDATED: {
      let uploadId = -1
      const updatedUploads = uploads.map((upload, index) => {
        if (upload.id === action.upload.id) {
          uploadId = index
          return {
            ...upload, ...action.upload
          }
        }
        return upload
      })
      return uploadId !== -1
        ? updatedUploads
        : [action.upload, ...uploads]
    }

    case UPLOADER_ITEM_DELETED: {
      const index = uploads.findIndex(
        current =>
          current.response.body.public_id === action.publicId
      )
      return [
        ...uploads.slice(0, index),
        ...uploads.slice(index + 1),
      ]
    }

    default:
      return [...uploads]
  }
}


