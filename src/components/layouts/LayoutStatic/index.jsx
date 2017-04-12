import React, { Component, PropTypes } from 'react'

import {
  layout
} from './style'

console.log(layout)
export default ({ children }) => (
  <div className={layout} >
    {children}
  </div>
)
