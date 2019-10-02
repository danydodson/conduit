import { requests } from '../agent'

const Mediums = {
  getAll: () => requests.get('/mediums')
}

export default Mediums