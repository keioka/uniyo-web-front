import actionTypes from '../../actionTypes'

const initialiState = {
  displayType: '',
  isOpen: false,
  isFetchingUserInfo: false,
  isFetchingNotification: false,
  isFetchingHistoryDonut: false,
  userInfo: {},
  channelUsers: [],
  notifications: [],
  historyDonut: [],
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case actionTypes.showNotification.request: {
      return Object.assign({
        isOpen: true,
        displayType: 'Notification'
      })
    }

    case actionTypes.showHistoryDonut.request: {
      return Object.assign({
        isOpen: true,
        displayType: 'Donuts'
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

    case actionTypes.showChannelUsers.success: {
      return Object.assign({
        isOpen: true,
        channelUsers: action.users,
        displayType: 'ChannelUsers',
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
