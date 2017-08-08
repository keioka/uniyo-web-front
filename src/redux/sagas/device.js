import { put, take, select, takeLatest, call, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { browserHistory } from 'react-router'

import { actionTypes } from 'uniyo-redux'
import uiActionTypes from '../actionTypes'

export function* deviceManageSaga() {
  while(true) {
    const params = yield take(actionTypes.addDevice.request)
    const { deviceId, deviceType, accessToken } = params
    yield take(uiActionTypes.signout.request)
    yield put({ type: actionTypes.deleteDevice.request, deviceId, deviceType, accessToken })
  }
}
