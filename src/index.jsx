import React from 'react'
import { DockableSagaView, createSagaMonitor } from 'redux-saga-devtools'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routes.jsx'
import { storage } from './utils/index'
import store from './redux/store'
import uiAction from './redux/actions'

const monitor = createSagaMonitor()

render(
  <div>
    <Provider store={store}>
      <AppRouter />
    </Provider>
    {__DEV__ && <DockableSagaView monitor={monitor} /> }
  </div>,
  document.querySelector('#content')
)

if (__DEV__) {
  if (module.hot) {
    module.hot.accept('./components', () => { render(<AppRouter />) })
  }
}
