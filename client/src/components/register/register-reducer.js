import {
  APP_ASYNC_START,
  AUTH_USER_REGISTER,
  AUTH_UPDATE_FIELD,
  REGISTER_FORM_LOADED,
  REGISTER_FORM_UNLOADED,
} from '../../actions'

export default (state = {}, action) => {
  switch (action.type) {

    case AUTH_USER_REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }

    case REGISTER_FORM_LOADED:
      return {}

    case REGISTER_FORM_UNLOADED:
      return {}

    case APP_ASYNC_START:
      if (action.subtype === AUTH_USER_REGISTER) {
        return { ...state, inProgress: true }
      }
      break

    case AUTH_UPDATE_FIELD:
      return { ...state, [action.key]: action.value }

    default:
      return state
  }

  return state
}
