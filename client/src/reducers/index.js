import { combineReducers } from 'redux'
import common from './common-reducer'
import auth from './auth-reducer'
import home from './home-reducer'
import profile from './profile-reducer'
import posts from './posts-reducer'
import post from './post-reducer'
//import uploads from './uploads-reducer'
import editor from './editor-reducer'
import settings from './settings-reducer'
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
