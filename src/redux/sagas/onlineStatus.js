import { put, take, select, takeLatest, call, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { actionTypes } from 'uniyo-redux'

function* usersOnlineStatusFetchAsync() {
  yield put({ type: 'REQUEST_USERS_ONLINE_STATUS', userIds: [1] })
}

export function* watchUserSearchSuccess() {
  yield takeLatest(actionTypes.userSearch.success, usersOnlineStatusFetchAsync)
}

export function* watchChannelSearchSuccess() {
  yield takeLatest(actionTypes.channelSearch.success, usersOnlineStatusFetchAsync)
}
