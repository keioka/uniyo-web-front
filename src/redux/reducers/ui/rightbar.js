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
  donutsHistoryTabNumber: 1,
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case actionTypes.showNotification.request: {
      const request = !state.isOpen
      return Object.assign({
        isOpen: request,
        displayType: state.isOpen ? '' : 'Notification',
      })
    }

    case actionTypes.showHistoryDonut.request: {
      const { tabNumber } = action
      return Object.assign({
        isOpen: true,
        displayType: 'Donuts',
        donutsHistoryTabNumber: tabNumber,
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
      const { user } = action.result.data
      const { campusDonuts = [] } = state
      return Object.assign({
        isReceiveDonuts: true,
        campusDonuts: [...campusDonuts, user],
      })
    }

    case actionTypes.donutsCampusShift.success: {
      let nextCampusDonuts = [...state.campusDonuts]
      nextCampusDonuts.shift()

      return Object.assign({
        campusDonuts: nextCampusDonuts,
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
