import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import AppRouter from './routes.jsx'

render(
  <AppRouter />,
  document.querySelector('#content')
)
