import { combineReducers } from 'redux'
import article from './article'
import articles from './articles'
import auth from './auth'
import common from './common'
import editor from './editor'
import home from './home'
import profile from './profile'
import settings from './settings'
import photo_item from './photo_item'
import photo_feed from './photos_feed'
import photo_uploaded from './photo_uploaded'
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
  photo_item,
  photo_feed,
  photo_uploaded,
  router: connectRouter(history)
})
