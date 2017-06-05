import { put, take, select, takeLatest, call } from 'redux-saga/effects'
import uiActionTypes from '../../actionTypes'

function* contentReadCheckNotificationAsync() {
  console.log('hello')
}

export function* watchContentReadCheckNotificationSaga() {
  yield takeLatest(uiActionTypes.contentReadCheckNotification.request, contentReadCheckNotificationAsync)
}
