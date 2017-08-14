import { put, take, select, takeLatest, takeEvery, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import uiActionTypes from '../../actionTypes'
import { actionTypes } from 'uniyo-redux'
import sagas from '../'

const getUsers = state => state.api.users
const getTokens = state => state.api.auth.token
const getDonutsCampus = state => state.ui.rightbar.campusDonuts

function* showUserInfo({ userId }) {

  // TODO: Maybe Delete? Just filter user states and dispatch from UI

  if (userId) {
    const users = yield select(getUsers)
    const tokens = yield select(getTokens)
    const { accessToken } = tokens

    // let user = users.all.find(user => user.id === userId)

    const user = yield call(sagas.userInfoAsync, { userId, accessToken })

    if (user) {
      yield put({ type: uiActionTypes.showUserInfo.success, user })
    } else {
      yield put({ type: uiActionTypes.showUserInfo.error, error: 'user is not found' })
    }
  }
}

function* showChannelUsers({ userIds }) {
  if (userIds) {
    yield put({ type: uiActionTypes.showChannelUsers.success, userIds })
  } else {
    yield put({ type: uiActionTypes.showChannelUsers.error, error: 'user is not found' })
  }
}

function* donutsCampusShiftAsync() {
  yield call(delay, 500)
  const campusDonuts = yield select(getDonutsCampus)
  if (campusDonuts && campusDonuts.length > 0) {
    yield put({ type: uiActionTypes.donutsCampusShift.success })
  } else {
    yield put({ type: uiActionTypes.donutsCampusShift.error })
  }
}

export function* watchShowChannelUsers() {
  yield takeLatest(uiActionTypes.showChannelUsers.request, showChannelUsers)
}

export function* watchShowUserInfo() {
  yield takeLatest(uiActionTypes.showUserInfo.request, showUserInfo)
}

export function* watchDonutsShift() {
  yield takeEvery(uiActionTypes.donutsCampusShift.request, donutsCampusShiftAsync)
}
