import crypto from 'crypto'

/**
 * Generates a sha1 hash key.
 * @param {String} query a string of req parameters
 * @returns {*}
 * 
 */

export default hasher = query => {
  return crypto
    .createHash('sha1')
    .update(query, 'utf8')
    .digest('hex')
}
