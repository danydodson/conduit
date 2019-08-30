import {
  SET_PAGE,
  CHANGE_TAB,
  POST_FAVORITED,
  POST_UNFAVORITED,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
  UPLOADER_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/types'

export default (state = {}, action) => {
  switch (action.type) {

    case POST_FAVORITED:
    case POST_UNFAVORITED:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.slug === action.payload.post.slug) {
            return {
              ...post,
              favorited: action.payload.post.favorited,
              favoritesCount: action.payload.post.favoritesCount
            }
          }
          return post
        })
      }

    case SET_PAGE:
      return {
        ...state,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        currentPage: action.page
      }

    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      }

    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].tags,
        posts: action.payload[1].posts,
        postsCount: action.payload[1].postsCount,
        currentPage: 0,
        tab: action.tab
      }

    case HOME_PAGE_UNLOADED:
      return {}

    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      }

    case UPLOADER_PAGE_LOADED:
      return {
        ...state,
        photo: action.payload
      }

    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        posts: action.payload[1].posts,
        postsCount: action.payload[1].postsCount,
        currentPage: 0
      }

    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {}

    default:
      return state
  }
}
