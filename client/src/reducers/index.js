import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './reduce-auth'
import common from './reduce-common'
import profile from './reduce-profile'
import settings from './reduce-settings'
import home from './reduce-home'
import posts from './reduce-posts'
import post from './reduce-post'
import uploads from './reduce-uploads'
import editor from './reduce-editor'

export default (history) => combineReducers({
  common: common,
  auth: auth,
  home: home,
  editor: editor,
  profile: profile,
  uploads: uploads,
  posts: posts,
  post: post,
  settings: settings,
  router: connectRouter(history),
})
