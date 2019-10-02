import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import app from '../components/app/app-reducer'
import register from '../components/register/register-reducer'
import login from '../components/login/login-reducer'
import home from '../components/home/home-reducer'
import editor from '../components/editor/editor-reducer'
import profile from '../components/profile/profile-reducer'
import uploads from '../components/form/dropzone/dropzone-reducer'
import posts from '../components/home/posts/posts-reducer'
import post from '../components/post/post-reducer'
import settings from '../components/settings/settings-reducer'

export default (history) => combineReducers({
  app: app,
  register: register,
  login: login,
  home: home,
  editor: editor,
  profile: profile,
  uploads: uploads,
  posts: posts,
  post: post,
  settings: settings,
  router: connectRouter(history),
})
