import actionTypes from '../../actionTypes'

export const setUploadedImageTooLarge = () => ({
  type: actionTypes.uploadedImageTooLarge.set,
})

export const clearUploadedImageTooLarge = () => ({
  type: actionTypes.uploadedImageTooLarge.clear,
})
