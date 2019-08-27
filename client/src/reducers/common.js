import {
  APP_LOAD,
  LOGIN,
  LOGOUT,
  REDIRECT,
  HOME_PAGE_UNLOADED,
  PHOTO_PAGE_UNLOADED,
  REGISTER,
  DELETE_USER,
  REGISTER_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ARTICLE_PAGE_UNLOADED,
  DELETE_ARTICLE,
  SETTINGS_SAVED,
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

    case ARTICLE_SUBMITTED:
      const redirectUrl = `/article/${action.payload.article.slug}`
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

    case DELETE_ARTICLE:
      return {
        ...state, redirectTo: '/'
      }

    case ARTICLE_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PHOTO_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {
        ...state,
        viewChangeCounter: state.viewChangeCounter + 1
      }

    default:
      return state
  }
}
