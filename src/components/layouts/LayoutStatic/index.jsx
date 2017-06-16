import React, { Component, PropTypes } from 'react'

import {
  layout
} from './style'

const LayoutStatic = ({ children }) => (
  <div className={layout} >
    {children}
  </div>
)

LayoutStatic.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutStatic
