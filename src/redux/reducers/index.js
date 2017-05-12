import { combineReducers } from 'redux'
import { reducers } from 'uniyo-redux'
import uiReducers from './ui/'
import formReducers from './form/'

export default combineReducers({
  api: reducers,
  ui: uiReducers,
  form: formReducers,
})
