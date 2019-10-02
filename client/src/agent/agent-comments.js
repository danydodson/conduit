import { requests } from '../agent'

const Comments = {
  create: (slug, comment) =>
    requests.post(`/posts/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/posts/${slug}/comments/${commentId}`),
  forPost: slug =>
    requests.get(`/posts/${slug}/comments`)
}

export default Comments