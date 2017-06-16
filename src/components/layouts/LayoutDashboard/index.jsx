import React, { Component, PropTypes } from 'react'

import {
  layout
} from './style'

const LayoutDashboard = ({ children }) => (
  <div className={layout} >
    {children}
  </div>
)

LayoutDashboard.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutDashboard
