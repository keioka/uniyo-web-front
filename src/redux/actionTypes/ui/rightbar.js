const actionTypes = (baseType) => ({
  request: `${baseType}_REQUEST`,
  success: `${baseType}_SUCCESS`,
  error: `${baseType}_ERROR`,
})

export const fetchUserInfo = actionTypes('FETCH_USER_INFO')
export const fetchNotification = actionTypes('FETCH_NOTIFICATION')
export const fetchHistoryDonut = actionTypes('FETCH_HISTORY_DONUT')
export const showNotification = actionTypes('SHOW_NOTIFICATION')
export const showUserInfo = actionTypes('SHOW_USER_INFO')
export const showChannelUsers = actionTypes('SHOW_CHANNEL_USERS')
export const showHistoryDonut = actionTypes('SHOW_HISTORY_DONUT')
export const hideSidebarRight = actionTypes('HIDE_SIDEBAR_RIGTH')
