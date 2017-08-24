import { combineReducers } from 'redux'
import { reducers } from 'uniyo-redux'
import uiReducers from './ui/'
import formReducers from './form/'
import uiActionTypes from '../actionTypes'

const appReducer = combineReducers({
  api: reducers,
  ui: uiReducers,
  form: formReducers,
})

const initialState = appReducer({}, {})

const rootReducer = (state, action) => {
  let nextState = state
  if (action.type === uiActionTypes.signout.done) {
    nextState = initialState
  }

  return appReducer(nextState, action)
}

export default rootReducer
