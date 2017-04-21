import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routes.jsx'
import { storage } from './utils/index'
import store from './redux/store'

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.querySelector('#content')
)

if (__DEV__) {
  if (module.hot) {
    module.hot.accept('./components', () => { render(<AppRouter />) })
  }
}
