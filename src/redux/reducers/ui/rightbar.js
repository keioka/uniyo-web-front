import actionTypes from '../../actions'

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
        displayType: 'UserInfo'
      })
    }

    case actionTypes.showHistoryDonut.request: {
      return Object.assign({
        displayType: ''
      })
    }

    case actionTypes.hideNotification.request: {
      return Object.assign({
        isOpen: false,
        displayType: ''
      })
    }

    case actionTypes.hideUserInfo.request: {
      return Object.assign({
        isOpen: false,
        displayType: ''
      })
    }

    case actionTypes.hideHistoryDonut.request: {
      return Object.assign({
        isOpen: false,
        displayType: ''
      })
    }

    default: {
      return state
    }
  }
}
