import { combineReducers } from 'redux'
import common from './common'
import auth from './auth'
import home from './home'
import profile from './profile'
import posts from './posts'
import post from './post'
//import uploads from './uploads'
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
  //uploads: uploads,
  editor: editor,
  settings: settings,
  router: connectRouter(history)
})
