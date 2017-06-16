import React from 'react'
import { DockableSagaView, createSagaMonitor } from 'redux-saga-devtools'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routes.jsx'
import { storage } from './utils/index'
import uiAction from './redux/actions'
import { AppContainer } from 'react-hot-loader'

render(
  <AppContainer>
    <AppRouter />
  </AppContainer>,
  document.querySelector('#content')
)

if (__PROD__) {
  Raven.config('https://8e9e4881bf0143fca6904609c5995d85@sentry.io/180567').install()
}

// If it is some changes render new components
if (__DEV__ && module.hot) {
  module.hot.accept('./routes.jsx', () => {
    const AppRouter = require('./routes.jsx').default
    render(
      <AppContainer>
        <AppRouter />
      </AppContainer>,
      document.querySelector('#content')
    )
  })
}
