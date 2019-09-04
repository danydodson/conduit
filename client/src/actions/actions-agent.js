import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'
import Config from '../config'

const superagent = superagentPromise(_superagent, global.Promise)

const LOCAL_API = Config.LOCAL_API

const encode = encodeURIComponent
const responseBody = res => res.body

let token = null

const tokenPlugin = req => {
  if (token) req.set('authorization', `Token ${token}`)
}

const requests = {
  del: url =>
    superagent.del(`${LOCAL_API}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${LOCAL_API}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${LOCAL_API}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${LOCAL_API}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  delete: user =>
    requests.del('/user', { user }),
  current: user =>
    requests.get('/user', { user }),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
}

const Tags = {
  getAll: () => requests.get('/tags')
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = post => Object.assign({}, post, { slug: undefined })

const Posts = {
  all: page =>
    requests.get(`/posts?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/posts?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/posts?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/posts/${slug}`),
  favorite: slug =>
    requests.post(`/posts/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/posts?favorited=${encode(author)}&${limit(10, page)}`),
  feed: page =>
    requests.get(`/posts/feed?${limit(10, page)}`),
  get: slug =>
    requests.get(`/posts/${slug}`),
  unfavorite: slug =>
    requests.del(`/posts/${slug}/favorite`),
  update: post =>
    requests.put(`/posts/${post.slug}`, { post: omitSlug(post) }),
  create: post =>
    requests.post('/posts', { post })
}

const Comments = {
  create: (slug, comment) =>
    requests.post(`/posts/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/posts/${slug}/comments/${commentId}`),
  forPost: slug =>
    requests.get(`/posts/${slug}/comments`)
}

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
}

export default {
  Auth, Tags, Profile, Posts, Comments,
  setToken: _token => { token = _token }
}
