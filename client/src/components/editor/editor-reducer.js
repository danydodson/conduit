import {
  EDITOR_FORM_UNLOADED,
  EDITOR_POST_SUBMITTED,
  TOAST_SUCCESS_NOTIFICATION,
  TOAST_INFO_NOTIFICATION,
  TOAST_ERROR_NOTIFICATION,
  APP_ASYNC_START,
  EDITOR_FORM_LOADED,
  EDITOR_TEXT_FIELD_UPDATE,
  EDITOR_CHECKBOX_SWITCHED,
  EDITOR_TAG_ADDED,
  EDITOR_TAG_REMOVED,
} from '../../actions'

export default (state = {}, action) => {
  switch (action.type) {

    case EDITOR_FORM_LOADED:
      return {
        ...state,
        medium: action.payload ? action.payload.post.medium : '',
        title: action.payload ? action.payload.post.title : '',
        description: action.payload ? action.payload.post.description : '',
        body: action.payload ? action.payload.post.body : '',
        shareable: action.payload ? action.payload.shareable : true,
        allow_comments: action.payload ? action.payload.allow_comments : true,
        purchasable: action.payload ? action.payload.purchasable : false,
        price: action.payload ? action.payload.post.price : '',
        tagList: action.payload ? action.payload.post.tagList : [],
        tagInput: '',
        slug: action.payload ? action.payload.post.slug : '',
        signature: action.payload ? action.payload.post.signature : '',
      }

    case EDITOR_FORM_UNLOADED:
      return {}

    case EDITOR_POST_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      }

    case APP_ASYNC_START:
      if (action.subtype === EDITOR_POST_SUBMITTED) {
        return {
          ...state,
          inProgress: true,
        }
      }
      break

    case EDITOR_TAG_ADDED:
      return Object.assign({}, state,
        { tagList: state.tagList.concat([state.tagInput]), tagInput: '' }
      )

    case EDITOR_TAG_REMOVED:
      return Object.assign({}, state,
        { tagList: state.tagList.filter(tag => tag !== action.tag), }
      )

    case EDITOR_TEXT_FIELD_UPDATE:
      return Object.assign({}, state, { [action.key]: action.value })

    case EDITOR_CHECKBOX_SWITCHED:
      return Object.assign({}, state, { [action.key]: action.checked })

    case TOAST_SUCCESS_NOTIFICATION:
      return {
        ...state,
        toast: action.success
      }

    case TOAST_INFO_NOTIFICATION:
      return {
        ...state,
        toast: action.info
      }

    case TOAST_ERROR_NOTIFICATION:
      return {
        ...state,
        toast: action.error
      }

    default:
      return state
  }

  return state
}
