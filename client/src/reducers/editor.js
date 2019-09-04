import {
  EDITOR_LOADED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  ADD_MEDIUM,
  REMOVE_MEDIUM,
  POST_SUBMITTED,
  UPDATE_FIELD_EDITOR,
  UPDATE_CHECKBOX,
  EDITOR_UNLOADED,
} from '../constants/types'

export default (state = {}, action) => {
  switch (action.type) {

    case EDITOR_LOADED:
      return {
        ...state,
        postSlug: action.payload ? action.payload.post.slug : '',
        title: action.payload ? action.payload.post.title : '',
        description: action.payload ? action.payload.post.description : '',
        body: action.payload ? action.payload.post.body : '',
        MediumInput: '',
        mediumList: action.payload ? action.payload.post.mediumList : [],
        category: action.payload ? action.payload.post.category : '',
        shareable: action.payload ? true : false,
        allow_comments: action.payload ? true : false,
        purchasable: action.payload ? true : false,
        price: action.payload ? action.payload.post.price : '',
        tagInput: '',
        tagList: action.payload ? action.payload.post.tagList : []
      }

    case EDITOR_UNLOADED:
      return {}

    case ASYNC_START:
      if (action.subtype === POST_SUBMITTED) {
        return { ...state, inProgress: true }
      }
      break

    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      }

    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      }

    case ADD_MEDIUM:
      return {
        ...state,
        mediumList: state.mediumList.concat([state.mediumInput]),
        mediumInput: ''
      }

    case REMOVE_MEDIUM:
      return {
        ...state,
        mediumList: state.mediumList.filter(medium => medium !== action.medium)
      }

    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value }

    case UPDATE_CHECKBOX:
      return { ...state, [action.key]: action.value }

    default:
      return state
  }

  return state
}
