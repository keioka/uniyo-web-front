import { combineReducers } from 'redux'
import { reducers } from 'uniyo-redux'

export default combineReducers({
  api: reducers,
  ui: reducers,
})
