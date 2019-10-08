import {
  APP_LOAD,
  APP_REDIRECT_LOCATION,
  EDITOR_POST_SUBMITTED,
  SETTINGS_FORM_SAVED,
  POST_ITEM_DELETE_POST,
  AUTH_USER_LOGIN,
  AUTH_USER_LOGOUT,
  AUTH_USER_REGISTER,
  AUTH_USER_DELETE,
  HOME_PAGE_UNLOADED,
  LOGIN_FORM_UNLOADED,
  REGISTER_FORM_UNLOADED,
  SETTINGS_FORM_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  POST_ITEM_UNLOADED,
  EDITOR_FORM_UNLOADED,
  PROFILE_FAVORITES_UNLOADED,

} from '../../actions'

const defaultState = {
  appName: 'SeeSee',
  token: null,
  viewChangeCounter: 0,
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null,
      }

    case APP_REDIRECT_LOCATION:
      return {
        ...state,
        redirectTo: null,
      }

    case AUTH_USER_DELETE:
    case AUTH_USER_LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null }

    case EDITOR_POST_SUBMITTED:
      const redirectUrl = `/post/${action.payload.post.slug}`
      return {
        ...state,
        redirectTo: redirectUrl,
      }

    case SETTINGS_FORM_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user,
      }

    case AUTH_USER_LOGIN:
    case AUTH_USER_REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user,
      }

    case POST_ITEM_DELETE_POST:
      return {
        ...state, redirectTo: '/'
      }

    case HOME_PAGE_UNLOADED:
    case LOGIN_FORM_UNLOADED:
    case REGISTER_FORM_UNLOADED:
    case SETTINGS_FORM_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case POST_ITEM_UNLOADED:
    case EDITOR_FORM_UNLOADED:
    case PROFILE_FAVORITES_UNLOADED:
      return {
        ...state,
        viewChangeCounter: state.viewChangeCounter + 1
      }

    default:
      return state
  }
}
