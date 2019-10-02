import {
  APP_ASYNC_START,
  AUTH_USER_LOGIN,
  AUTH_UPDATE_FIELD,
  LOGIN_FORM_LOADED,
  LOGIN_FORM_UNLOADED,
} from '../../actions'

export default (state = {}, action) => {
  switch (action.type) {

    case AUTH_USER_LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }

    case LOGIN_FORM_LOADED:
      return {}

    case LOGIN_FORM_UNLOADED:
      return {}

    case APP_ASYNC_START:
      if (action.subtype === AUTH_USER_LOGIN) {
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
