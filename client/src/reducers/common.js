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
  HOME_PAGE_UNLOADED,
  PHOTOS_SUBMITTED,
  //PHOTOS_PAGE_LOADED,
  PHOTO_PAGE_UNLOADED,
  PHOTOS_PAGE_UNLOADED,
  UPLOADER_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  POST_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
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

    case PHOTOS_SUBMITTED:
      const redirectToPhoto = `/photos`
      return { ...state, redirectTo: redirectToPhoto }

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

    case UPLOADER_PAGE_UNLOADED:
    case PHOTO_PAGE_UNLOADED:
    case PHOTOS_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case POST_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {
        ...state,
        viewChangeCounter: state.viewChangeCounter + 1
      }

    default:
      return state
  }
}
