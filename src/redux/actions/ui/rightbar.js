import actionTypes from '../../actionTypes'

export const showUserInfo = (userId) => ({
  type: actionTypes.showUserInfo.request,
  userId,
})

export const showNotification = (notifications) => ({
  type: actionTypes.showNotification.request,
  notifications,
})

export const showHistoryDonut = (history) => ({
  type: actionTypes.showHistoryDonut.request,
  history,
})

export const hideUserInfo = (user) => ({
  type: actionTypes.hideUserInfo.request,
  user,
})

export const hideNotification = (notifications) => ({
  type: actionTypes.hideNotification.request,
  notifications,
})

export const hideHistoryDonut = (history) => ({
  type: actionTypes.hideHistoryDonut.request,
  history,
})
