import actionTypes from '../../actionTypes'

export const setReadNotificationIds = notificationId => ({
  type: actionTypes.readNotificationIds.set,
  notificationId,
})

export const clearReadNotificationIds = () => ({
  type: actionTypes.readNotificationIds.clear,
})
