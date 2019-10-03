import {
  SETTINGS_FORM_SAVED,
  SETTINGS_FORM_UNLOADED,
  APP_ASYNC_START,
  APP_ASYNC_END,
} from '../../actions'

export default (state = {}, action) => {
  switch (action.type) {

    case SETTINGS_FORM_SAVED:
      return {
        ...state,
        inProgress: false,
        errors: action.error
          ? action.payload.errors
          : null
      }

    case SETTINGS_FORM_UNLOADED:
      return {}

    case APP_ASYNC_START:
      return { ...state, inProgress: true }

    case APP_ASYNC_END:
      return { ...state, inProgress: false }

    default:
      return state
  }

}
