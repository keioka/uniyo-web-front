import React, { Component, PropTypes } from 'react'

import {
  layout
} from './style'

export default ({ children }) => (
  <div className={layout} >
    {children}
  </div>
)
