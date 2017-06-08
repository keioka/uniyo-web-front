import actionTypes from '../../actionTypes'

const initialiState = {
  displayType: '',
  isOpen: false,
  isReceiveDonuts: false,
  isFetchingUserInfo: false,
  isFetchingNotification: false,
  isFetchingHistoryDonut: false,
  userInfo: {},
  channelUsers: [],
  notifications: [],
  historyDonut: [],
  campusDonuts: [],
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

    case actionTypes.donutsCampusFetch.success: {
      console.log('actionTypes.donutsCampusFetch.success')
      const { toUser } = action.result.data
      return Object.assign({
        isReceiveDonuts: true,
        campusDonuts: [...state.campusDonuts, toUser],
      })
    }

    case actionTypes.donutsCampusThrow.success: {
      const campusDonuts = [...new Set(state.campusDonuts)]

      if (campusDonuts.length > 0) {
        campusDonuts.shift()
      }

      return Object.assign({
        isReceiveDonuts: false,
        campusDonuts,
      })
    }


    default: {
      return state
    }
  }
}
