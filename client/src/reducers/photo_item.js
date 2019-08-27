import {
  PHOTO_PAGE_LOADED,
  PHOTO_PAGE_UNLOADED
} from '../constants/types'

export default (state = {}, action) => {
  switch (action.type) {

    case PHOTO_PAGE_LOADED:
      return {
        ...state,
        photo: action.payload
      }

    case PHOTO_PAGE_UNLOADED:
      return {}

    default:
      return state
  }
}
