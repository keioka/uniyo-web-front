import { put, take, select, takeLatest, call, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { actionTypes } from 'uniyo-redux'

function* usersOnlineStatusFetchAsync({ payload: users }) {
  const userIds = users.map(user => user.id)
  yield put({ type: 'QUERY_USERS_ONLINE_STATUS_REQUEST', userIds })
}

export function* watchUserSearchSuccess() {
  yield takeLatest(actionTypes.userSearch.success, usersOnlineStatusFetchAsync)
}

export function* watchChannelSearchSuccess() {
  // yield takeLatest(actionTypes.channelSearch.success, usersOnlineStatusFetchAsync)
}
