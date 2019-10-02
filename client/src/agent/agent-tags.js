import { requests } from '../agent'

const Tags = {
  getAll: () => requests.get('/tags')
}

export default Tags