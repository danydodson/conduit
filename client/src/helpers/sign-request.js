import crypto from 'crypto'

import {
  CLOUD_SECRET,
  CLOUD_DESTROY,
  CLOUD_KEY,
} from '../configs'

const id = 'public_id='
const time = '&timestamp='
const api = '&api_key='
const sign = '&signature='

const Signed = (item, version, ) => {

  const genSigned = params => {
    return crypto
      .createHash('sha1')
      .update(params, 'utf8')
      .digest('hex')
  }

  const auth = genSigned(id + item + time + version + CLOUD_SECRET)
  const req = CLOUD_DESTROY + id + item + time + version + api + CLOUD_KEY + sign + auth

  return req

}

export default Signed
