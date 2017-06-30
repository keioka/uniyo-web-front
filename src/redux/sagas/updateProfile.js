import { put, take, select, takeLatest, call, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { actionTypes } from 'uniyo-redux'

function* userPictureUpdateRefreshAsync() {
  const auth = yield select(state => state.api.auth)
  const { accessToken } = auth.token
  const { currentUser } = auth
  const { id: userId } = currentUser
  yield call(delay, 2000)
  yield put({ type: actionTypes.currentUser.request, userId, accessToken })
}

export function* userPictureUpdateRefreshSaga() {
  yield takeLatest(actionTypes.userPictureUpdate.success, userPictureUpdateRefreshAsync)
}
