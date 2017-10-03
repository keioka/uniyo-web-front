import React, { Component, PropTypes } from 'react'

import {
  layout,
  h2,
} from './style.scss'

import {
  Donut,
} from '../../'

const LayoutInit = ({ children }) => (
  <div className={layout} >
    <Donut size="xl" />
  </div>
)

export default LayoutInit
