import { put, take, select, takeLatest, call } from 'redux-saga/effects'
import uiActionTypes from '../../actionTypes'
import { actionTypes } from 'uniyo-redux'
import sagas from '../'

const getUsers = state => state.api.users
const getTokens = state => state.api.auth.token

function* showUserInfo({ userId }) {

  // TODO: Maybe Delete? Just filter user states and dispatch from UI

  if (userId) {
    const users = yield select(getUsers)
    const tokens = yield select(getTokens)
    const { accessToken } = tokens

    let user = users.all.find(user => user.id === userId)

    if (!user) {
      user = yield call(sagas.userInfoAsync, { userId, accessToken })
    }

    if (user) {
      yield put({ type: uiActionTypes.showUserInfo.success, user })
    } else {
      yield put({ type: uiActionTypes.showUserInfo.error, error: 'user is not found' })
    }
  }
}

function* showChannelUsers({ users }) {
  if (users) {
    yield put({ type: uiActionTypes.showChannelUsers.success, users })
  } else {
    yield put({ type: uiActionTypes.showChannelUsers.error, error: 'user is not found' })
  }
}

export function* watchShowChannelUsers() {
  yield takeLatest(uiActionTypes.showChannelUsers.request, showChannelUsers)
}

export function* watchShowUserInfo() {
  yield takeLatest(uiActionTypes.showUserInfo.request, showUserInfo)
}
