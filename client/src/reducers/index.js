import { combineReducers } from 'redux'
import article from './article'
import articles from './articles'
import auth from './auth'
import common from './common'
import editor from './editor'
import home from './home'
import profile from './profile'
import settings from './settings'
import photos from './photos'
import uploaded from './uploaded'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  common: common,
  auth: auth,
  home: home,
  profile: profile,
  articles: articles,
  article: article,
  uploaded: uploaded,
  photos: photos,
  editor: editor,
  settings: settings,
  router: connectRouter(history)
})
