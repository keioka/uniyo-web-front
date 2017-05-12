import actionTypes from '../../actionTypes'

const initialiState = {
  readNotificationIds: [],
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case actionTypes.readNotificationIds.set: {
      const { notificationId } = action
      return Object.assign({
        readNotificationIds: [ ...state.readNotificationIds, notificationId ],
      })
    }

    case actionTypes.readNotificationIds.clear: {
      return Object.assign({
        readNotificationIds: [],
      })
    }

    default: {
      return state
    }
  }
}
