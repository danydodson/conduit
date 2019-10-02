import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'
import Auth from './agent-auth'
import Comments from './agent-comments'
import Mediums from './agent-mediums'
import Posts from './agent-posts'
import Profile from './agent-profiles'
import Tags from './agent-tags'

import { LOCAL_API } from '../configs'

const superagent = superagentPromise(_superagent, global.Promise)
const responseBody = res => res.body

let token = null

const tokenPlugin = req => {
  if (token) req.set('authorization', `Token ${token}`)
}

export const requests = {
  del: url =>
    superagent.del(`${LOCAL_API}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${LOCAL_API}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${LOCAL_API}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${LOCAL_API}${url}`, body).use(tokenPlugin).then(responseBody)
}

export default {
  Auth, Tags, Mediums, Profile, Posts, Comments, setToken: _token => { token = _token }
}
