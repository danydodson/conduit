import {
  APP_ASYNC_START,
  SETTINGS_FORM_SAVED,
} from '../constants'

export default (state = {}, action) => {
  switch (action.type) {

    case SETTINGS_FORM_SAVED:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors
          : null
      }

    case APP_ASYNC_START:
      return {
        ...state,
        inProgress: true
      }

    default:
      return state
  }
}
