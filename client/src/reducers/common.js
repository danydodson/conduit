import {
  APP_LOAD,
  LOGIN,
  LOGOUT,
  REDIRECT,
  REGISTER,
  DELETE_USER,
  DELETE_POST,
  SETTINGS_SAVED,
  POST_SUBMITTED,
  HOME_UNLOADED,
  REGISTER_UNLOADED,
  POST_UNLOADED,
  SETTINGS_UNLOADED,
  LOGIN_UNLOADED,
  EDITOR_UNLOADED,
  PROFILE_UNLOADED,
  PROFILE_FAVORITES_UNLOADED,
} from '../constants/types'

const defaultState = {
  appName: 'SeeSee',
  token: null,
  viewChangeCounter: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      }

    case REDIRECT:
      return {
        ...state,
        redirectTo: null
      }

    case LOGOUT:
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      }

    case POST_SUBMITTED:
      const redirectUrl = `/post/${action.payload.post.slug}`
      return { ...state, redirectTo: redirectUrl }

    case DELETE_USER:
      const userId = action.userId
      return {
        ...state,
        users: state.users.filter(user => user.id !== userId)
      }

    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      }

    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      }

    case DELETE_POST:
      return {
        ...state, redirectTo: '/'
      }

    case HOME_UNLOADED:
    case LOGIN_UNLOADED:
    case EDITOR_UNLOADED:
    case POST_UNLOADED:
    case REGISTER_UNLOADED:
    case PROFILE_UNLOADED:
    case SETTINGS_UNLOADED:
    case PROFILE_FAVORITES_UNLOADED:
      return {
        ...state,
        viewChangeCounter: state.viewChangeCounter + 1
      }

    default:
      return state
  }
}
