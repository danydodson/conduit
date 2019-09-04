import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_LOADED,
  PROFILE_UNLOADED
} from '../constants/types'

export default (state = {}, action) => {
  switch (action.type) {

    case PROFILE_LOADED:
      return { ...action.payload[0].profile }

    case PROFILE_UNLOADED:
      return {}

    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return { ...action.payload.profile }

    default:
      return state
  }
}
