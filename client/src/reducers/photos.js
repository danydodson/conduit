import {
  PHOTOS_FETCHED,
  PHOTOS_UPLOADED,
  DELETE_UPLOADED_PHOTO,
} from '../constants/types'

export default (photos = [], action) => {
  switch (action.type) {

    case PHOTOS_FETCHED:
      return photos

    case PHOTOS_UPLOADED: {
      return photos
    }

    case DELETE_UPLOADED_PHOTO:
      return photos.filter(
        photo => photo.public_id !== action.publicId
      )

    default:
      return [...photos]
  }
}
