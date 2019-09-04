import {
  ADD_COMMENT,
  DELETE_COMMENT,
  POST_LOADED,
  POST_UNLOADED
} from '../constants/types'

export default (state = {}, action) => {
  switch (action.type) {

    case POST_LOADED:
      return {
        ...state,
        post: action.payload[0].post,
        comments: action.payload[1].comments
      }

    case POST_UNLOADED:
      return {}

    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ? null :
          (state.comments || []).concat([action.payload.comment])
      }

    case DELETE_COMMENT:
      const commentId = action.commentId
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      }

    default:
      return state
  }
}
