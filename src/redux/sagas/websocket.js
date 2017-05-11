import { put, take, fork, call, takeLatest, select, takeEvery, wait, race, cancel } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { eventChannel, END } from 'redux-saga'
import uiActionTypes from '../actionTypes'
import { actionTypes } from 'uniyo-redux'
import converter from 'json-style-converter/es5'
const webSocketUrl = 'wss://live.uniyo.io/v1/ws'

class UniyoWebSocket {

  set sessinId(sessionId) {
    this.sessionId = sessionId
  }

  constructor() {
    this.init()
    this.sessionId = null
  }

  init() {
    this.isInitialing = false
    this.isInitialized = false
    this.isSocketReady = false
    this.isAuthenticated = false
    this.socket = null
    this.connectionTryNumber = 0
    this.pinger = null
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

  reset() {
    this.init()
  }

  send(messaga) {

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
      console.log('message type', type)
      switch (type) {
        case 'SOCKET_READY': {
          emit({ type: 'WEBSOCKET_READY', response })
          break
        }
        case 'PONG': {
          console.log('pong')
          break
        }
        case 'HELLO': {
          emit({ type: 'WEBSOCKET_HELLO', response })
          break
        }
        case 'EVENT': {
          const action = { type: 'WEBSOCKET_EVENT', data: data.event }
          emit(action)
          break
        }
      }
    }

    socket.onclose = (event) => {
      const reset = () => {
        emit({ type: 'WEBSOCKET_RESET'})
      }
      reset()
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
    sessionId: uniyoWs.sessionId,
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

function* ping(socket) {
  // let times = 0 <- use for test onclose
  while (true) {
    yield call(delay, 10 * 1000)
    const message = {
      id: 1,
      type: 'PING',
    }
    // times += 1 <- use for test onclose

    // if (times === 2) { <- use for test onclose
      // uniyoWs.socket.close()
    // }
    uniyoWs.socket.send(JSON.stringify(converter.snakeToCamelCase(message)))
  }
}

function* flow() {
  // get initialized web socket
  let task
  while (true) {
    const appFlow = yield race({
      init: take('WEBSOCKET_INIT'),
      reset: take('WEBSOCKET_RESET'),
      stop: take('WEBSOCKET_STOP')
    })

    if (appFlow.init) {
      task = yield fork(runWebSocket)
    } else if (appFlow.reset) {
      yield cancel(task)
      uniyoWs.reset()
      console.warn('websocket is reseted')
      task = yield fork(runWebSocket)
    } else if (appFlow.stop) {
      yield cancel(task)
    }

  }
}

function* initWebSocket() {
  yield takeLatest('WEBSOCKET_READY', authenticate)
}


function* helloWebSocket() {
  yield takeLatest('WEBSOCKET_HELLO', ping)
}

function* eventWebSocket() {
  yield takeEvery('WEBSOCKET_EVENT', function* eventHandler(payload) {
    try {
      const { type } = payload.data
      let action
      switch (type) {
        case 'NEW_POST': {
          const { post } = payload.data
          action = { type: actionTypes.postInfo.success, result: { data: post } }
          break
        }

        case 'NEW_COMMENT': {
          const { comment } = payload.data
          action = { type: actionTypes.commentFetch.success, result: { data: comment } }
          break
        }

        case 'NEW_CHANNEL_MESSAGE': {
          const { channelId, channelMessage: message } = payload.data
          message.channelId = channelId
          action = { type: actionTypes.messageFetch.success, result: { data: message } }
          break
        }

        default:
          console.warn(`Don't know how to handle ${type} event.`);
      }

      yield put(action)
    } catch (e) {
      console.warn(e)
    }
  })
}

export default function* webSocket() {
  yield fork(flow)
  yield fork(initWebSocket)
  yield fork(helloWebSocket)
  yield fork(eventWebSocket)
}
