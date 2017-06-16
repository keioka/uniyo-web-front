import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { actions } from 'uniyo-redux'
import rootSaga from './sagas/root'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import { accessTokenValidator } from './middlewares/accessTokenValidator'
import { redirectHandler } from './middlewares/redirectHandler'
import { initializeApp } from './middlewares/initializeApp'
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, accessTokenValidator, redirectHandler, initializeApp]

function configureStore() {
  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(...middlewares),
  )(createStore)
  return createStoreWithMiddleware(reducers)
}

const store = configureStore()
sagaMiddleware.run(rootSaga)

export default store
