import actionTypes from '../../actionTypes'

export const setUploadImageTooLarge = notificationId => ({
  type: actionTypes.readNotificationIds.set,
  notificationId,
})

export const clearUploadImageTooLarge = () => ({
  type: actionTypes.readNotificationIds.clear,
})
