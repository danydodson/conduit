import { requests } from '../agent'

const encode = encodeURIComponent

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = post => Object.assign({}, post, { slug: undefined })

const Posts = {
  all: page =>
    requests.get(`/posts?${limit(30, page)}`), // imit(10, page)
  byAuthor: (author, page) =>
    requests.get(`/posts?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/posts?tag=${encode(tag)}&${limit(30, page)}`), // imit(10, page)
  byMedium: (medium, page) =>
    requests.get(`/posts?medium=${encode(medium)}&${limit(30, page)}`), // imit(10, page)
  del: slug =>
    requests.del(`/posts/${slug}`),
  favorite: slug =>
    requests.post(`/posts/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/posts?favorited=${encode(author)}&${limit(10, page)}`),
  feed: page =>
    requests.get(`/posts/feed?${limit(30, page)}`), // imit(10, page)
  get: slug =>
    requests.get(`/posts/${slug}`),
  unfavorite: slug =>
    requests.del(`/posts/${slug}/favorite`),
  update: post =>
    requests.put(`/posts/${post.slug}`, { post: omitSlug(post) }),
  create: post =>
    requests.post('/posts', { post })
}

export default Posts