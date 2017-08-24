import { put, take, select, takeLatest, call, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { browserHistory } from 'react-router'

import { actionTypes } from 'uniyo-redux'
import uiActionTypes from '../actionTypes'

function* signoutFlow() {
  localStorage.clear()
  browserHistory.push('/')
  yield put({ type: 'WS@STOP' })
  yield put({ type: uiActionTypes.signout.done })
}

export function* signoutProcessSaga() {
  while(true) {
    yield take(uiActionTypes.signout.request)
    // yield take(actionTypes.deleteDevice.success)
    yield delay(1000)
    yield fork(signoutFlow)
  }
}
