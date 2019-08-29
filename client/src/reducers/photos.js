import {
  PHOTOS_FETCHED,
  PHOTOS_UPLOADED,
  PHOTOS_PAGE_UNLOADED,
  DELETE_UPLOADED_PHOTO
} from '../constants/types'

export default (photos = [], action) => {
  switch (action.type) {

    case PHOTOS_FETCHED:
      return [...action.photos]

    case PHOTOS_UPLOADED: {
      return [...action.photos, ...photos]
    }

    case PHOTOS_PAGE_UNLOADED:
      return []

    case DELETE_UPLOADED_PHOTO:
      return photos.filter(
        photo =>
          photo.public_id !== action.publicId
      )

    default:
      return [...photos]
  }
}
