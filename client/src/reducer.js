import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import app from './components/app/app-reducer'
import auth from './components/auth/auth-reducer'
import home from './components/home/home-reducer'
import editor from './components/editor/editor-reducer'
import profile from './components/profile/profile-reducer'
import uploads from './components/form/dropzone/dropzone-reducer'
import posts from './components/home/posts/posts-reducer'
import post from './components/post/post-reducer'
import settings from './components/settings/settings-reducer'

export default (history) => combineReducers({
  app: app,
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
