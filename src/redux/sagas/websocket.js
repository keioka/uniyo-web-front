import { put, take, fork, call, takeLatest, select, takeEvery } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import uiActionTypes from '../actionTypes'
import { actionTypes } from 'uniyo-redux'
import converter from 'json-style-converter/es5'

const webSocketUrl = 'wss://live.uniyo.io/v1/ws'

class UniyoWebSocket {

  set sessinId (sessionId) {
    this.sessionId = sessionId
  }

  connect() {
    console.log(this)
    if (!this.socket) {
      const socket = new WebSocket(webSocketUrl)
      return new Promise(resolve => {
        this.socket = socket
        resolve(this.socket)
      })
    } else {
      return this.socket
    }
  }
}

const uniyoWs = new UniyoWebSocket()

// function onMessage
console.log(uniyoWs)

function subscribe(socket) {
  return eventChannel(emit => {
    socket.onmessage = (response) => {
      console.log(response)
      let data = JSON.parse(response.data)
      const { type } = data
      data = converter.snakeToCamelCase(data)
      switch (type) {
        case "SOCKET_READY": {
          emit({ type: "WEBSOCKET_READY", response })
          break
        }
        case "HELLO": {
          emit({ type: "WEBSOCKET_HELLO", response })
          break
        }
        case "EVENT": {
          console.log('event', response)
          emit({ type: "WEBSOCKET_EVENT", response })
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
    version: "1",
    deviceId: "???",
    clientType: "BROWSER",
    type: "HELLO"
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


export default function* webSocket() {
  yield fork(flow)
  yield fork(initWebSocket)
}
