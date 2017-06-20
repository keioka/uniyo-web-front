import React, { Component, PropTypes } from 'react'

import {
  layout,
  h2,
} from './style'

import {
  Donut,
} from '../../'

const LayoutInit = ({ children }) => (
  <div className={layout} >
    <Donut size="xl" />
    <h2 className={h2}>Uniyo</h2>
    <h2>Initializing app...</h2>
  </div>
)

export default LayoutInit
