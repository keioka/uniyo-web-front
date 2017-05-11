import { put, take, fork, call } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import uiActionTypes from '../actionTypes'
import { actionTypes } from 'uniyo-redux'
import converter from 'json-style-converter/es5'

const webSocketUrl = 'wss://live.uniyo.io/v1/ws'

function connect() {
  const socket = new WebSocket(webSocketUrl)
  return new Promise(resolve => {
    resolve(socket)
  })
}

function authenticate() {
  const authMsg = {
    id: 1,
    sessionId: this.sessionId,
    accessToken: getAccessToken(),
    version: "1",
    deviceId: "???",
    clientType: "BROWSER",
    type: "HELLO"
  }

  sendMessage(authMsg)
}

function sendMessage(msg) {
  const snakeCaseMsg = converter.camelToSnakeCase(msg)
  this.ws.send(JSON.stringify(snakeCaseMsg))
}

// function onMessage

function subscribe(socket) {
  return eventChannel(emit => {

    socket.onmessage = (event) => {
      console.log(event)
      let data = JSON.parse(event.data)
      const { type } = data
      data = converter.snakeToCamelCase(data)
      switch (type) {
        case "SOCKET_READY": {
          emit({ type: "WEBSOCKET/READY", data })
        }
      }
    }

    return () => {
      socket.close()
    }
  })
}

function* flow() {
  // get initialized web socket
  const socket = yield call(connect)
  const channel = yield call(subscribe, socket)

  while (true) {
    const action = yield take(channel)
    yield put(action)
    console.log('take: ', action)
  }
}

export default function* webSocket() {
  yield fork(flow)
}
