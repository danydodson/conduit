import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import common from './common'
import profile from './profile'
import settings from './settings'
import home from './home'
import posts from './posts'
import post from './post'
import uploaded from './uploaded'
import editor from './editor'

export default (history) => combineReducers({
  common: common,
  auth: auth,
  home: home,
  editor: editor,
  profile: profile,
  uploaded: uploaded,
  posts: posts,
  post: post,
  settings: settings,
  router: connectRouter(history),
})
