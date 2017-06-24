import { put, take, select, takeLatest, call, fork } from 'redux-saga/effects'
import uiActionTypes from '../../actionTypes'
import { actionTypes } from 'uniyo-redux'

function* contentReadCheckNotificationRequest({ notificationId }) {
  yield put({ type: actionTypes.notificationReadMark.request, notificationId })
}

function* contentReadCheckNotificationAsync({ ids }) {
  yield ids.map(idObject => fork(contentReadCheckNotificationRequest, { notificationId: idObject.notificationId } ))
}

export function* watchContentReadCheckNotificationSaga() {
  yield takeLatest(uiActionTypes.contentReadCheckNotification.request, contentReadCheckNotificationAsync)
}
