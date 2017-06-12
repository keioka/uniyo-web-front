import actionTypes from '../../actionTypes'

export const showUserInfo = (userId) => ({
  type: actionTypes.showUserInfo.request,
  userId,
})

export const showNotification = () => ({
  type: actionTypes.showNotification.request,
})

export const showChannelUsers = (users) => ({
  type: actionTypes.showChannelUsers.request,
  users,
})

export const showHistoryDonut = (tabNumber) => ({
  type: actionTypes.showHistoryDonut.request,
  tabNumber,
})

export const hideSidebarRight = () => ({
  type: actionTypes.hideSidebarRight.request,
})
