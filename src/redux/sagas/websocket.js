import { put, take, fork, call, takeLatest, select, takeEvery } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import uiActionTypes from '../actionTypes'
import { actionTypes } from 'uniyo-redux'
import converter from 'json-style-converter/es5'
require("babel-polyfill")
const webSocketUrl = 'wss://live.uniyo.io/v1/ws'

class UniyoWebSocket {

  set sessinId(sessionId) {
    this.sessionId = sessionId
  }

  connect() {
    if (!this.socket) {
      const socket = new WebSocket(webSocketUrl)
      return new Promise((resolve) => {
        this.socket = socket
        resolve(this.socket)
      })
    }
    return this.socket
  }
}

const uniyoWs = new UniyoWebSocket()

// function onMessage

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.onmessage = (response) => {
      let data = JSON.parse(response.data)
      const { type } = data
      data = converter.snakeToCamelCase(data)
      switch (type) {
        case 'SOCKET_READY': {
          emit({ type: 'WEBSOCKET_READY', response })
          break
        }
        case 'HELLO': {
          emit({ type: 'WEBSOCKET_HELLO', response })
          break
        }
        case 'EVENT': {
          const action = { type: 'WEBSOCKET_EVENT', data: data.event }
          console.log(action)
          emit(action)
          break
        }
      }
    }

    return () => {
      socket.close()
    }
  })
}


function* authenticate(response) {
  const getTokens = state => state.api.auth.token
  const tokens = yield select(getTokens)
  const message = {
    id: 1,
    sessionId: null,
    accessToken: tokens.accessToken,
    version: '1',
    deviceId: '???',
    clientType: 'BROWSER',
    type: 'HELLO',
  }

  const snakeCaseMsg = converter.camelToSnakeCase(message)
  uniyoWs.socket.send(JSON.stringify(snakeCaseMsg))
}

function* runWebSocket() {
  const socket = yield call(uniyoWs.connect.bind(uniyoWs))
  const channel = yield call(subscribe, socket)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

function* flow() {
  // get initialized web socket
  while (true) {
    yield take('WEBSOCKET_INIT')
    yield fork(runWebSocket)
  }
}

function* initWebSocket() {
  yield takeLatest('WEBSOCKET_READY', authenticate)
}

function* eventWebSocket() {
  yield takeEvery('WEBSOCKET_EVENT', function* eventHandler(payload) {
    try {
      const { type } = payload
      const action = { type: actionTypes.postInfo.success, result: { data: payload.data.post } }
      console.log(action)
      yield put(action)
    } catch (e) {
      console.warn(e)
    }
  })
}

export default function* webSocket() {
  yield fork(flow)
  yield fork(initWebSocket)
  yield fork(eventWebSocket)
}
