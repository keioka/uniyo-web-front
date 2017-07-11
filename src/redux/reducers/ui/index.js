import { combineReducers } from 'redux'
import header from './header'
import rightbar from './rightbar'
import dashboard from './dashboard'

export default combineReducers({
  header,
  rightbar,
  dashboard,
})
