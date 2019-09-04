import {
  // UPLOADER_LOADED,
  // UPLOADER_UNLOADED,
  UPDATE_UPLOADS,
  DELETE_UPLOADS
} from '../constants/types'

export default (state = {}, uploads = [], action) => {
  switch (action.type) {

    // case UPLOADER_LOADED:
    //   return uploads = []

    // case UPLOADER_UNLOADED: {
    //   return uploads = []
    // }

    case UPDATE_UPLOADS: {
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

    case DELETE_UPLOADS: {
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


