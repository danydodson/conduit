import {
  APP_ASYNC_START,
  EDITOR_FORM_LOADED,
  EDITOR_UPDATE_FIELD,
  EDITOR_UPDATE_CHECKBOX,
  EDITOR_ADD_MEDIUM,
  EDITOR_REMOVE_MEDIUM,
  EDITOR_ADD_TAG,
  EDITOR_REMOVE_TAG,
  EDITOR_POST_SUBMITTED,
  EDITOR_FORM_UNLOADED,
} from '../actions/actions-types'

export default (state = {}, action) => {
  switch (action.type) {

    case EDITOR_FORM_LOADED:
      return {
        ...state,
        postSlug: action.payload ? action.payload.post.slug : '',
        title: action.payload ? action.payload.post.title : '',
        description: action.payload ? action.payload.post.description : '',
        body: action.payload ? action.payload.post.body : '',
        mediumInput: '',
        mediumList: action.payload ? action.payload.post.mediumList : [],
        category: action.payload ? action.payload.post.category : '',
        shareable: action.payload ? true : false,
        allow_comments: action.payload ? true : false,
        purchasable: action.payload ? true : false,
        price: action.payload ? action.payload.post.price : '',
        tagInput: '',
        tagList: action.payload ? action.payload.post.tagList : []
      }

    case EDITOR_FORM_UNLOADED:
      return {}

    case APP_ASYNC_START:
      if (action.subtype === EDITOR_POST_SUBMITTED) {
        return { ...state, inProgress: true }
      }
      break

    case EDITOR_ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      }

    case EDITOR_REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      }

    case EDITOR_ADD_MEDIUM:
      return {
        ...state,
        mediumList: state.mediumList.concat([state.mediumInput]),
        mediumInput: ''
      }

    case EDITOR_REMOVE_MEDIUM:
      return {
        ...state,
        mediumList: state.mediumList.filter(medium => medium !== action.medium)
      }

    case EDITOR_UPDATE_FIELD:
      return { ...state, [action.key]: action.value }

    case EDITOR_UPDATE_CHECKBOX:
      return { ...state, [action.key]: action.value }

    default:
      return state
  }

  return state
}