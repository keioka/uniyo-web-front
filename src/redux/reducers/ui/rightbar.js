import actionTypes from '../../actionTypes'

const initialiState = {
  displayType: '',
  isOpen: false,
  isFetchingUserInfo: false,
  isFetchingNotification: false,
  isFetchingHistoryDonut: false,
  userInfo: {},
  notifications: [],
  historyDonut: [],
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case actionTypes.showNotification.request: {
      return Object.assign({
        displayType: 'Notification'
      })
    }

    case actionTypes.showUserInfo.request: {
      return Object.assign({
        isOpen: true,
        isFetchingUserInfo: true,
      })
    }

    case actionTypes.showUserInfo.success: {
      return Object.assign({
        isFetchingUserInfo: false,
        userInfo: action.user,
        isOpen: true,
        displayType: 'UserInfo',
      })
    }

    case actionTypes.showHistoryDonut.request: {
      return Object.assign({
        displayType: ''
      })
    }

    case actionTypes.hideSidebarRight.request: {
      return Object.assign({
        displayType: '',
        isOpen: false,
        isFetchingUserInfo: false,
        isFetchingNotification: false,
        isFetchingHistoryDonut: false,
        userInfo: {},
        notifications: [],
        historyDonut: [],
      })
    }

    default: {
      return state
    }
  }
}
