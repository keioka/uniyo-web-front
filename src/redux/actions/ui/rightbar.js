import actionTypes from '../../actionTypes'

export const showUserInfo = (userId) => ({
  type: actionTypes.showUserInfo.request,
  userId,
})

export const showNotification = () => ({
  type: actionTypes.showNotification.request,
})

export const showChannelUsers = (userIds) => ({
  type: actionTypes.showChannelUsers.request,
  userIds,
})

export const showHistoryDonut = (tabNumber) => ({
  type: actionTypes.showHistoryDonut.request,
  tabNumber,
})

export const hideSidebarRight = () => ({
  type: actionTypes.hideSidebarRight.request,
})

export const donutsCampusShift = () => ({
  type: actionTypes.donutsCampusShift.request,
})
