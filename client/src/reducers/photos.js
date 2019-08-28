import {
  PHOTOS_FETCHED,
  PHOTOS_UPLOADED,
  DELETE_UPLOADED_PHOTO,
  PHOTO_PAGE_UNLOADED
} from '../constants/types'

export default (photos = [], action) => {
  switch (action.type) {

    case PHOTOS_FETCHED:
      //return photos
      return [...action.photos]

    case PHOTOS_UPLOADED: {
      //return photos
      return [...action.photos, ...photos]
    }

    case PHOTO_PAGE_UNLOADED:
      return []

    case DELETE_UPLOADED_PHOTO:
      return photos.filter(
        photo => photo.public_id !== action.publicId
      )

    default:
      return [...photos]
  }
}
