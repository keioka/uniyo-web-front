import { sagas } from 'uniyo-redux'
import * as rightbar from './ui/rightbar'
import * as header from './ui/header'
import * as notification from './ui/notification'
import * as dashboard from './ui/dashboard'
import * as input from './ui/input'

import webSocket from './websocket'
import * as app from './app'
import * as formNotification from './form/notification'
import * as updateProfile from './updateProfile'
import * as onlineStatus from './onlineStatus'
import * as device from './device'

export default {
  ...sagas,
  ...app,
  ...rightbar,
  ...header,
  ...dashboard,
  ...notification,
  ...formNotification,
  ...updateProfile,
  ...onlineStatus,
  ...device,
  ...input,
  webSocket,
}
