import {
  UPLOADER_MEDIA_UPLOADED,
  UPLOADER_MEDIA_DELETED,
} from '../constants'

export default (uploads = [], action) => {
  switch (action.type) {

    // case PHOTOS_UPLOADED: {
    //   return [...action.uploads, ...uploads]
    // }

    case UPLOADER_MEDIA_UPLOADED: {
      let upIndex = -1

      const updateList = uploads.map((upload, index) => {
        if (upload.id === action.upload.id) {
          upIndex = index
          return { ...upload, ...action.uploaded }
        }
        return upload
      })
      return upIndex !== -1 ? updateList : [action.upload, ...uploads]
    }

    case UPLOADER_MEDIA_DELETED: {
      const id = uploads.findIndex(current =>
        current.response.body.public_id === action.pubId
      )

      return [...uploads.slice(0, id), ...uploads.slice(id + 1)]
    }

    default:
      return [...uploads]
  }
}