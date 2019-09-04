import {
  UPLOADER_ITEMS_FETCHED,
  UPLOADER_ITEMS_UPLOADED,
  UPLOADER_DELETE_UPLOAD,
} from '../actions/actions-types'

export default (uploads = [], action) => {
  switch (action.type) {

    case UPLOADER_ITEMS_FETCHED:
        return [...action.uploads]

    case UPLOADER_ITEMS_UPLOADED: {
      return [...action.uploads, ...uploads]
    }

    case UPLOADER_DELETE_UPLOAD:
      return uploads.filter(upload =>
        upload.public_id !== action.publicId
      )

    default:
      return [...uploads]
  }
}

