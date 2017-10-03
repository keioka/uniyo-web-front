import React, { Component, PropTypes } from 'react'

import {
  layout,
} from './style.scss'

const LayoutAuth = ({ children }) => (
  <div className={layout} >
    {children}
  </div>
)

LayoutAuth.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutAuth
