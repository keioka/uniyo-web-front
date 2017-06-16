import { actionTypes } from 'uniyo-redux'
import { actions } from 'uniyo-redux'
import { storage } from '../../utils'
import { browserHistory } from 'react-router'
import { put } from 'redux-saga/effects'
export const initializeApp = store => next => action => {

  if (!localStorage) {
    console.warn("Local Storage is not available")
  }

  // fetch current user info to auth reducer
  if (
    action.type === actionTypes.tokenRefresh.success ||
    action.type === actionTypes.logIn.success ||
    action.type === actionTypes.userCreate.success
  ) {
    const userId = JSON.parse(storage.user).id
    const { accessToken } = storage

    if (window.analytics) {
      window.analytics.identify(userId)
    }

    store.dispatch(actions.currentUser({
      userId,
      accessToken,
    }))

    store.dispatch(actions.channelSearch({
      accessToken,
    }))

    store.dispatch(actions.hashtagTrendingSearch({
      accessToken,
    }))

    store.dispatch(actions.notificationSearch({
      accessToken,
    }))

    store.dispatch(actions.currentUserDonuts({
      accessToken,
    }))

    store.dispatch({ type: 'WEBSOCKET_INIT' })
  }

  return next(action)
}
