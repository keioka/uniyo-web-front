import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import AppRouter from './routes.jsx'

import { reducers } from 'uniyo-redux'
import { sagas } from 'uniyo-redux'
import { actions } from 'uniyo-redux'

import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

function configureStore() {
  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )(createStore)
  return createStoreWithMiddleware(reducers)
}

const store = configureStore()

console.log(actions)
console.log(sagas)

sagaMiddleware.run(sagas.schoolsSearchSaga)
sagaMiddleware.run(sagas.logInSaga)
sagaMiddleware.run(sagas.userCreateSaga)

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.querySelector('#content')
)
