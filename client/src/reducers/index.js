import { combineReducers } from 'redux'
import common from './common'
import auth from './auth'
import home from './home'
import profile from './profile'
import post from './post'
import posts from './posts'
import uploaded from './uploaded'
import uploader from './uploader'
import editor from './editor'
import settings from './settings'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  common: common,
  auth: auth,
  home: home,
  profile: profile,
  posts: posts,
  post: post,
  uploader: uploader,
  uploaded: uploaded,
  editor: editor,
  settings: settings,
  router: connectRouter(history)
})
