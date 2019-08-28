export default {
  cloud_name: `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
  upload_preset: `${process.env.REACT_APP_CLOUDINARY_CLOUD_PRESET}`,
  local_root_url: `${process.env.REACT_APP_EXPRESS_API_BASE_URL}`,
  cloud_root_url: `${process.env.REACT_APP_CLOUDINARY_API_BASE_URL}`,
  cloud_list_url: `${process.env.REACT_APP_CLOUDINARY_API_LIST_URL}`,
  cloud_env_url: `${process.env.REACT_APP_CLOUDINARY_ENV_URL}`
}
