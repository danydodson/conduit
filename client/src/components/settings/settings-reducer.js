import {
  SETTINGS_FORM_SAVED,
  SETTINGS_FORM_UNLOADED,
  APP_ASYNC_START,
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

    default:
      return state
  }

}
