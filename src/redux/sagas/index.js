import { sagas } from 'uniyo-redux'
import * as rightbar from './ui/rightbar'
import webSocket from './websocket'
import * as formNotification from './form/notification'

export default {
  ...sagas,
  ...rightbar,
  ...formNotification,
  webSocket,
}
