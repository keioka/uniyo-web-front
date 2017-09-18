import * as rightbar from './ui/rightbar'
import * as header from './ui/header'
import * as dashboard from './ui/dashboard'
import * as notification from './ui/notification'
import * as input from './ui/input'

import * as formNotification from './form/notification'
import * as formProfile from './form/profile'

export default {
  ...rightbar,
  ...header,
  ...dashboard,
  ...notification,
  ...input,
  ...formNotification,
  ...formProfile,
}
