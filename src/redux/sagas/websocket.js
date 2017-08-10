import { put, take, fork, call, takeLatest, select, takeEvery, wait, race, cancel } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { eventChannel } from 'redux-saga'
import uiActionTypes from '../actionTypes'
import { actionTypes } from 'uniyo-redux'
import converter from 'json-style-converter/es5'

import { pushNotificationNonVisiable } from '../../services/pushNotification'

const webSocketUrl = __PROD__ ? 'wss://live.uniyo.io/v1/ws' : 'wss://staging-live.uniyo.io/v1/ws'
const notificationSound = new Audio("/public/assets/audio/pop_drip.wav")

let instance
class UniyoWebSocket {

  set sessinId(sessionId) {
    this.sessionId = sessionId
  }

  constructor() {
    if(!instance) {
      instance = this
      instance.init()
      instance.sessionId = null
    }
    return instance
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
          uniyoWs.isSocketReady = true
          emit({ type: 'WS@READY', response })
          break
        }
        case 'PONG': {
          break
        }
        case 'HELLO': {
          uniyoWs.sessionId = data.sessionId
          uniyoWs.isAuthenticated = true
          emit({ type: 'WS@HELLO', response })
          break
        }
        case 'EVENT': {
          const action = { type: 'WS@EVENT', data: data.event }
          emit(action)
          break
        }

        case 'NOTIFICATION': {
          const { notification } = data
          const action = { type: 'WS@NOTIFICATION', notification }
          emit(action)
          break
        }

        case 'QUERY_USER_PRESENCE': {
          const { statuses } = data
          const action = { type: actionTypes.userOnlineStatusUpdate.success, payload: statuses }
          emit(action)
          break
        }

        case 'ERROR': {
          let { error } = data
          error = converter.snakeToCamelCase(error)
          console.error(error.code + ': ' + error.message)
        }

        default: {
          console.warn(`Don't know how to handle ${type} event.`)
        }
      }
    }

    socket.onopen = () => {
      uniyoWs.connectionTryNumber = 0
    }

    socket.onclose = (event) => {
      console.warn(event)
      const reset = () => {
        const reconnectIn = uniyoWs.connectionTryNumber * 1000
        setTimeout(() => { emit({ type: 'WS@RESET'}) }, reconnectIn)
        uniyoWs.connectionTryNumber = uniyoWs.connectionTryNumber + 1
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
    const webSocketFlow = yield race({
      init: take('WS@INIT'),
      reset: take('WS@RESET'),
      stop: take('WS@STOP')
    })

    if (webSocketFlow.init) {
      task = yield fork(runWebSocket)
    } else if (webSocketFlow.reset) {
      yield cancel(task)
      uniyoWs.reset()
      console.warn('websocket is reseted')
      task = yield fork(runWebSocket)
    } else if (webSocketFlow.stop) {
      yield cancel(task)
    }

  }
}

function* initWebSocket() {
  yield takeLatest('WS@READY', authenticate)
}

function* helloWebSocket() {
  yield takeLatest('WS@HELLO', ping)
}

function* eventWebSocket() {
  yield takeEvery('WS@EVENT', function* eventHandler(payload) {
    try {
      const { type } = payload.data
      let action
      switch (type) {
        case 'NEW_POST': {
          const { post } = payload.data
          const currentUserId = yield select(state => state.api.auth.currentUser.id)
          if (post.type === 'ANSWER' && post.user.id === currentUserId) {

          } else {
            action = { type: actionTypes.postInfo.success, result: { data: post } }
          }
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

        case 'NOTIFICATIONS_READ': {
          const { notificationIds } = payload.data
          const notificationId = notificationIds[0]
          // action = { type: actionTypes.notificationReadMark.success, result: { data: { notificationId } } }
          break
        }

        case 'USER_RECEIVED_DONUT': {
          const { fromUser, toUser } = payload.data
          const currentUserId = yield select(state => state.api.auth.currentUser.id)
          if (toUser.id === currentUserId) {
            action = { type: actionTypes.userReceivedDonutsFetch.success, result: { data: { fromUser } } }
            yield put({ type: uiActionTypes.donutsCampusFetch.success, result: { data: { user: toUser } } })
          } else {
            action = { type: actionTypes.otherUserReceivedDonutsFetch.success, result: { data: { toUser } } }
            yield put({ type: uiActionTypes.donutsCampusFetch.success, result: { data: { user: toUser } } })
          }
          break
        }

        case 'USER_PRESENCE_CHANGED': {
          const { status, userId } = payload.data
          action = { type: actionTypes.userOnlineStatusUpdate.success, payload: [{ status, userId }] }
          break
        }

        case 'COMMENT_RECEIVED_DONUT': {
          const { amount, commentId } = payload.data
          action = { type: actionTypes.commentReceivedDonutsFetch.success, result: { data: { amount, commentId } } }
          break
        }

        case 'POST_RECEIVED_DONUT': {
          const { postId, amount } = payload.data
          action = { type: actionTypes.postDonutsCountFetch.success, result: { data: { postId, amount } } }
          break
        }

        case 'USER_SPENT_DONUT': {
          const { amount } = payload.data
          action = { type: actionTypes.userSpentDonutsFetch.success, result: { data: { amount }  } }
          break
        }

        case 'QUERY_USER_PRESENCE': {
          const { statuses } = payload.data
          action = { type: actionTypes.usersOnlineStatusFetch.success, payload: statuses }
          break
        }

        default: {
          console.warn(`Don't know how to handle ${type} event.`)
        }
      }

      if (action) {
        yield put(action)
      }
    } catch (e) {
      console.warn(e)
    }
  })
}

function playNotificationSound() {
  notificationSound.play()
}

function* notificationWebSocket() {
  yield takeEvery('WS@NOTIFICATION', function* notificationHandler({ notification }) {
    try {
      yield put({ type: actionTypes.notificationFetch.success, result: { data: notification } })
      yield fork(playNotificationSound)
      if (document && document.hidden) {
        yield fork(pushNotificationNonVisiable, notification)
      }
    } catch (e) {
      console.error(e)
    }
  })
}

function* awaitUntilWebSocketReady(action) {
  yield takeLatest('WS@HELLO', function* resendRequest() {
    yield put(action)
  })
}

function* requestUsersOnlineStatusWebSocket() {
  yield takeEvery('QUERY_USERS_ONLINE_STATUS_REQUEST', function* requestUsersOnlineStatusHandler({ userIds }) {
    if (!uniyoWs.isAuthenticated) {
      const action = { type: 'QUERY_USERS_ONLINE_STATUS_REQUEST', userIds }
      yield fork(awaitUntilWebSocketReady, action)
    } else {
      try {
        const request = {
          id: 1,
          type: 'QUERY_USER_PRESENCE',
          userIds,
        }
        uniyoWs.socket.send(JSON.stringify(converter.camelToSnakeCase(request)))
      } catch (e) {
        console.warn(e)
      }
    }
  })
}


export default function* webSocket() {
  yield fork(flow)
  yield fork(initWebSocket)
  yield fork(helloWebSocket)
  yield fork(eventWebSocket)
  yield fork(notificationWebSocket)
  yield fork(requestUsersOnlineStatusWebSocket)
}
