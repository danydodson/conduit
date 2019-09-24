import {
  APP_ASYNC_START,
  EDITOR_FORM_LOADED,
  EDITOR_UPDATE_FIELD,
  EDITOR_UPDATE_CHECKBOX,
  EDITOR_ADD_TAG,
  EDITOR_REMOVE_TAG,
  EDITOR_POST_SUBMITTED,
  EDITOR_FORM_UNLOADED,
} from '../constants'

export default (state = {}, action) => {
  switch (action.type) {

    case EDITOR_FORM_LOADED:
      return {
        ...state,
        postSlug: action.payload ? action.payload.post.slug : '',
        uploads: action.payload ? action.payload.post.uploads : [],
        signature: action.payload ? action.payload.post.signature : '',
        title: action.payload ? action.payload.post.title : '',
        description: action.payload ? action.payload.post.description : '',
        body: action.payload ? action.payload.post.body : '',
        medium: action.payload ? action.payload.post.medium : '',
        shareable: action.payload ? true : false,
        allow_comments: action.payload ? true : false,
        purchasable: action.payload ? true : false,
        price: action.payload ? action.payload.post.price : '',
        tagInput: '',
        tagList: action.payload ? action.payload.post.tagList : []
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
        return { ...state, inProgress: true }
      }
      break

    case EDITOR_ADD_TAG:
      return Object.assign({}, state,
        {
          tagList: state.tagList.concat([state.tagInput]),
          tagInput: ''
        }
      )

    case EDITOR_REMOVE_TAG:
      return Object.assign({}, state,
        { tagList: state.tagList.filter(tag => tag !== action.tag), }
      )

    case EDITOR_UPDATE_FIELD:
      return Object.assign({}, state, { [action.key]: action.value })

    case EDITOR_UPDATE_CHECKBOX:
      return Object.assign({}, state, { [action.key]: action.value })

    default:
      return state
  }

  return state
}
