import {
  HOME_LOADED,
  HOME_UNLOADED,
} from '../constants/types'

export default (state = {}, action) => {
  switch (action.type) {

    case HOME_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      }

    case HOME_UNLOADED:
      return {}

    default:
      return state
  }

}
