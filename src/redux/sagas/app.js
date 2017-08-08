import { put, take, select, takeLatest, call, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { browserHistory } from 'react-router'

import { actionTypes } from 'uniyo-redux'
import uiActionTypes from '../actionTypes'

function* signoutFlow() {
  localStorage.clear()
  browserHistory.push('/')
}

export function* signoutProcessSaga() {
  while(true) {
    yield take(uiActionTypes.signout.request)
    yield take(actionTypes.deleteDevice.success)
    yield fork(signoutFlow)
  }
}
