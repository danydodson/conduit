import {
  //UPLOADER_FORM_LOADED,
  UPLOADER_ITEMS_UPLOADED,
  UPLOADER_DELETE_UPLOAD,
  UPLOADER_FORM_UNLOADED,
} from '../constants'

export default (uploads = [], action) => {
  switch (action.type) {

    case UPLOADER_FORM_UNLOADED:
      return uploads = []

    case UPLOADER_ITEMS_UPLOADED: {
      return [...action.uploads]
    }

    case UPLOADER_DELETE_UPLOAD:
      return uploads.filter(upload =>
        upload.public_id !== action.publicId
      )

    default:
      return [...uploads]
  }
}

