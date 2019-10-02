import { requests } from '../agent'

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

export default Auth