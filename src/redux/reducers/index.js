import { combineReducers } from 'redux'
import { reducers } from 'uniyo-redux'
import uiReducers from './ui/'

export default combineReducers({
  api: reducers,
  ui: uiReducers,
})
