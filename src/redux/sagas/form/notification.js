import { put, take, select, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import localActionTypes from '../../actionTypes'
import { actionTypes } from 'uniyo-redux'
import sagas from '../'

const getReadNotificationIds = state => state.form.notification.readNotificationIds
const getTokens = state => state.api.auth.token

function* markNotificationAsRead() {
  try {
    const notificationIds = yield select(getReadNotificationIds)
    if (notificationIds) {
      yield call(delay, 5 * 1000)
      yield put({ type: actionTypes.notificationReadMark.request, notificationIds })
      yield put({ type: localActionTypes.readNotificationIds.clear })
    } else {
    }
  } catch(e) {
    console.warn(e)
  }
}

export function* watchMarkNotificationAsRead() {
  yield takeLatest(localActionTypes.readNotificationIds.set, markNotificationAsRead)
}
