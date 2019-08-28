import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core'

export const url = (publicId, options) => {
  const scOptions = Util.withSnakeCaseKeys(options)
  const cl = CoreCloudinary.new()
  return cl.url(publicId, scOptions)
}

export const openUploadWidget = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options)
  window.cloudinary.openUploadWidget(scOptions, callback)
}

export const fetchPhotos = cloudName => {
  // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
  // and simply retrieve a list of all images with that tag.
  const options = {
    cloudName: cloudName,
    format: 'json',
    type: 'list',
    version: Math.ceil(new Date().getTime() / 1000),
  }

  const urlPath = url('seesee', options)

  return fetch(urlPath)
    .then(res => res.text())
    .then(text => (text ? JSON.parse(text).resources : []))
}


