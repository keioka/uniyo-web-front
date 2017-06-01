import { sagas } from 'uniyo-redux'
import * as rightbar from './ui/rightbar'
import * as header from './ui/header'
import webSocket from './websocket'
import * as formNotification from './form/notification'

export default {
  ...sagas,
  ...rightbar,
  ...header,
  ...formNotification,
  webSocket,
}
