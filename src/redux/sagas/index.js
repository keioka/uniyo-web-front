import { sagas } from 'uniyo-redux'
import * as rightbar from './ui/rightbar'
import * as header from './ui/header'
import * as notification from './ui/notification'
import * as dashboard from './ui/dashboard'

import webSocket from './websocket'
import * as formNotification from './form/notification'
import * as updateProfile from './updateProfile'
import * as onlineStatus from './onlineStatus'

export default {
  ...sagas,
  ...rightbar,
  ...header,
  ...dashboard,
  ...notification,
  ...formNotification,
  ...updateProfile,
  ...onlineStatus,
  webSocket,
}
