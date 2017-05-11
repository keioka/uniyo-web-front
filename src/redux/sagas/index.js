import { sagas } from 'uniyo-redux'
import * as rightbar from './ui/rightbar'
import webSocket from './websocket'

export default {
  ...sagas,
  ...rightbar,
  webSocket,
}
