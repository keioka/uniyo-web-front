import { combineReducers } from 'redux'
import header from './header'
import rightbar from './rightbar'
import dashboard from './dashboard'
import input from './input'

export default combineReducers({
  header,
  rightbar,
  dashboard,
  input,
})
