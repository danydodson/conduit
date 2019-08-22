import { combineReducers } from 'redux'
import article from './article'
import articles from './articles'
import auth from './auth'
import common from './common'
import editor from './editor'
import home from './home'
import profile from './profile'
import settings from './settings'
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
  router: connectRouter(history)
})
