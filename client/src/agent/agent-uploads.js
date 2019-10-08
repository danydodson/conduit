import { requests } from '../agent'
import { CLOUD_UPLOAD, CLOUD_KEY } from '../configs'

const Uploads = {

  create: (file, eager, pubid, time, sign, photoId, toastError, onUploaded, ) =>
    requests.upPost(CLOUD_UPLOAD)
      .field('file', file)
      .field('eager', eager)
      .field('public_id', pubid)
      .field('timestamp', time)
      .field('api_key', CLOUD_KEY)
      .field('signature', sign)
      .on('progress', progress => this.onProgress(photoId, file.name, progress))
      .end((error, response) => error ? toastError(response.body.error.message) : onUploaded(photoId, file.name, response)),

  delete: (req, onDeleteUpload) =>
    requests.upDel(req).then(onDeleteUpload.bind(this)),
}

export default Uploads