import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import AppRouter from './routes.jsx'

import { reducers } from 'uniyo-redux'
import { actions } from 'uniyo-redux'
import rootSaga from './redux/sagas/root'
import { accessTokenValidator } from './redux/middlewares/accessTokenValidator'

import { composeWithDevTools } from 'redux-devtools-extension'

import { storage } from './utils/index'

const sagaMiddleware = createSagaMiddleware()

function configureStore() {
  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(sagaMiddleware, accessTokenValidator),
  )(createStore)
  return createStoreWithMiddleware(reducers)
}

const store = configureStore()
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.querySelector('#content')
)

if (module.hot) {
  module.hot.accept('./components', () => {
    render(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
      document.querySelector('#content')
    )
  })
}
