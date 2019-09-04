import {
  UPLOADED_ITEMS_FETCHED,
  UPLOADER_ITEM_UPLOADED,
  UPLOADER_ITEM_DELETED,
  UPLOADER_ITEM_UPDATED,
} from './actions-types'

export const uploadsFetched = uploads => ({
  type: UPLOADED_ITEMS_FETCHED,
  uploads: uploads,
})

export const itemsUploaded = uploads => ({
  type: UPLOADER_ITEM_UPLOADED,
  uploads: uploads,
})

export const updateUploadedItem = uploadedItem => ({
  type: UPLOADER_ITEM_UPDATED,
  uploadedItem: uploadedItem,
})

export const deleteUploadedItem = publicId => ({
  type: UPLOADER_ITEM_DELETED,
  publicId: publicId,
})
