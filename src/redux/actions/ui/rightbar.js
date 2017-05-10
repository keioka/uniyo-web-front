import actionTypes from '../../actionTypes'

export const showUserInfo = (userId) => ({
  type: actionTypes.showUserInfo.request,
  userId,
})

export const showNotification = (notifications) => ({
  type: actionTypes.showNotification.request,
  notifications,
})

export const showChannelUsers = (users) => ({
  type: actionTypes.showChannelUsers.request,
  users,
})

export const showHistoryDonut = (history) => ({
  type: actionTypes.showHistoryDonut.request,
  history,
})

export const hideSidebarRight = () => ({
  type: actionTypes.hideSidebarRight.request,
})
