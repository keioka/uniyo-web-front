import { put, take, select, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import uiActionTypes from '../../actionTypes'

function* hidePopupAsync() {
  yield call(delay, 2000)
  yield put({ type: uiActionTypes.hidePopup.request })
}

export function* watchPopupShow() {
  yield takeLatest(uiActionTypes.showPopup.request, hidePopupAsync)
}
