import { sagas } from 'uniyo-redux'
import * as rightbar from './ui/rightbar'
import * as header from './ui/header'
import * as notification from './ui/notification'
import webSocket from './websocket'
import * as formNotification from './form/notification'
import * as updateProfile from './updateProfile'
export default {
  ...sagas,
  ...rightbar,
  ...header,
  ...notification,
  ...formNotification,
  ...updateProfile,
  webSocket,
}
