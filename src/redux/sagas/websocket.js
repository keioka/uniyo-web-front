import { put, take, fork, call, takeLatest, select, takeEvery, wait } from 'redux-saga/effects'
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
    this.isInitialing = false
    this.isInitialized = false
    this.isSocketReady = false
    this.isAuthenticated = false
    this.sessionId = null
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
  yield fork(ping, socket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

function* ping(socket) {
  while (true) {
    yield call(delay, 30 * 1000)
    const message = {
      id: 1,
      type: 'PING',
    }
    socket.send(JSON.stringify(converter.snakeToCamelCase(message)))
  }
}

function* flow() {
  // get initialized web socket
  while (true) {
    yield take('WEBSOCKET_INIT')
    const task = yield fork(runWebSocket)
    yield take('WEBSOCKET_STOP')
    yield cancel(task)
  }
}

function* initWebSocket() {
  yield takeLatest('WEBSOCKET_READY', authenticate)
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
          const message = payload.data.channelMessage
          const { channelId } = payload.data
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
  yield fork(eventWebSocket)
}
