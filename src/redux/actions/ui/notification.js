import actionTypes from '../../actionTypes'

export const contentReadCheckNotification = (userId) => ({
  type: actionTypes.contentReadCheckNotification.request,
  userId,
})
