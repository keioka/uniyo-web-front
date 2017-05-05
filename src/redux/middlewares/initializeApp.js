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
  if (action.type === actionTypes.tokenRefresh.success) {
    const userId = JSON.parse(storage.user).id
    const { accessToken } = storage
    store.dispatch(actions.currentUser({
      userId,
      accessToken,
    }))

    store.dispatch(actions.channelSearch({
      accessToken,
    }))

    console.log(actions)
    store.dispatch(actions.hashtagTrendingSearch({
      accessToken,
    }))
  }

  return next(action)
}
