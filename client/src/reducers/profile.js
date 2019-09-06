import {
  PROFILE_FOLLOW_USER,
  PROFILE_UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../utilities/constants'

export default (state = {}, action) => {
  switch (action.type) {

    case PROFILE_PAGE_LOADED:
      return { ...action.payload[0].profile }

    case PROFILE_PAGE_UNLOADED:
      return {}

    case PROFILE_FOLLOW_USER:
    case PROFILE_UNFOLLOW_USER:
      return { ...action.payload.profile }

    default:
      return state
  }
}
