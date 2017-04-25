const initialiState = {
  isFetchingUserInfo: false,
  isFetchingNotification: false,
  isFetchingHistoryDonut: false,
  userInfo: {},
  notifications: [],
  historyDonut: {},
}

const rightBar = (state = {}, action) => {
  swicth (action.type) {
    case fetchNotification.success: {
      return Object.assign()
    }

    case fetchUserInfo.success: {
      return Object.assign()
    }

    case fetchHistoryDonut: {
      return Object.assign()
    }
  }
}
