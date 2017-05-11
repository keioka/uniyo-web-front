import { put, take, fork, call } from 'redux-saga/effects'
import uiActionTypes from '../actionTypes'
import { actionTypes } from 'uniyo-redux'
import converter from 'json-style-converter/es5'

const webSocketUrl = 'wss://live.uniyo.io/v1/ws'

function connect () {
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

function onMessage(event) {
  let data = JSON.parse(event.data)
  const { type } = data
  data = converter.snakeToCamelCase(data)

  switch (type) {
    case "SOCKET_READY": {
      
    }
  }
}

function* flow() {
  // get initialized web socket
  const socket = yield call(connect)
  socket.onmessage = onMessage
}

export default function* webSocket() {
  yield fork(flow)
}
