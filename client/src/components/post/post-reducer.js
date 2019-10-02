import {
  POST_ITEM_LOADED,
  POST_ITEM_UNLOADED,
  POST_ITEM_ADD_COMMENT,
  POST_ITEM_DELETE_COMMENT,
} from '../../actions'

export default (state = {}, action) => {
  switch (action.type) {

    case POST_ITEM_LOADED:
      return {
        ...state,
        post: action.payload[0].post,
        comments: action.payload[1].comments
      }

    case POST_ITEM_UNLOADED:
      return {}

    case POST_ITEM_ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ? null :
          (state.comments || []).concat([action.payload.comment])
      }

    case POST_ITEM_DELETE_COMMENT:
      const commentId = action.commentId
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      }

    default:
      return state
  }
}
