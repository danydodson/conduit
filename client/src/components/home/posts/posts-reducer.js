import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  SET_VIEW_TAB,
  SET_VIEW_PAGE_,
  // SET_TAG_FILTER,
  SET_MEDIUM_FILTER,
  POST_ITEM_FAVORITED,
  POST_ITEM_UNFAVORITED,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_LOADED,
  PROFILE_FAVORITES_UNLOADED
} from '../../../actions'

export default (state = {}, action) => {
  switch (action.type) {

    case POST_ITEM_FAVORITED:
    case POST_ITEM_UNFAVORITED:
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

    case SET_VIEW_PAGE_:
      return {
        ...state,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        currentPage: action.page
      }

    case SET_MEDIUM_FILTER:
      return {
        ...state,
        pager: action.pager,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        tab: null,
        medium: action.medium,
        currentPage: 0
      }

    // case SET_TAG_FILTER:
    //   return {
    //     ...state,
    //     pager: action.pager,
    //     posts: action.payload.posts,
    //     postsCount: action.payload.postsCount,
    //     tab: null,
    //     tag: action.tag,
    //     currentPage: 0
    //   }

    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        mediums: action.payload[0].mediums,
        // tags: action.payload[0].tags,
        posts: action.payload[1].posts,
        postsCount: action.payload[1].postsCount,
        currentPage: 0,
        tab: action.tab
      }

    case HOME_PAGE_UNLOADED:
      return {}

    case SET_VIEW_TAB:
      return {
        ...state,
        pager: action.pager,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        tab: action.tab,
        currentPage: 0,
        medium: null,
        // tag: null
      }

    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_LOADED:
      return {
        ...state,
        pager: action.pager,
        posts: action.payload[1].posts,
        postsCount: action.payload[1].postsCount,
        currentPage: 0
      }

    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_UNLOADED:
      return {}

    default:
      return state
  }
}
