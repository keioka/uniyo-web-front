import React, { Component, PropTypes } from 'react'

import {
  button,
} from './style'

export default (props) => {
  return (
    <button className={button} {...props}>{props.children}</button>
  )
}
