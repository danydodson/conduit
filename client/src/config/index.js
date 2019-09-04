export default {
  cloudName: `${process.env.REACT_APP_CLOUD_NAME}`,
  cloudPreset: `${process.env.REACT_APP_CLOUD_PRESET}`,
  cloudGetUrl: `${process.env.REACT_APP_CLOUD_GET_URL}`,
  cloudPostUrl: `${process.env.REACT_APP_CLOUD_POST_URL}`,
  cloudDeleteUrl: `${process.env.REACT_APP_CLOUD_DELETE_URL}`,
  localUrl: `http://localhost:4100/api`,
  CLOUD: 'scenicloud',
  PRESET: 'seesee',
  POST_URL: 'https://api.cloudinary.com/v1_1/scenicloud/upload',
  DELETE_URL: 'https://api.cloudinary.com/v1_1/scenicloud/delete_by_token'
}
