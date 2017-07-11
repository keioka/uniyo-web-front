import * as rightbar from './ui/rightbar'
import * as header from './ui/header'
import * as notification from './ui/notification'
import * as dashboard from './ui/dashboard'

import * as formNotification from './form/notification'
import * as formProfile from './form/profile'

export default {
  ...dashboard,
  ...rightbar,
  ...header,
  ...notification,
  ...formProfile,
}
