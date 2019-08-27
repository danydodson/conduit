import { combineReducers } from 'redux'
import article from './article'
import articles from './articles'
import auth from './auth'
import common from './common'
import editor from './editor'
import home from './home'
import profile from './profile'
import settings from './settings'
import photos_list from './photos_list'
import uploaded_photo from './uploaded_photo'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  article,
  articles,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
  photos_list,
  uploaded_photo,
  router: connectRouter(history)
})
