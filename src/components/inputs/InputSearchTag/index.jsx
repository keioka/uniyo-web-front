import React, { Component, PropTypes } from 'react'

import {
  input,
} from './style'

export default (props) => {
  const classNames = `${input} ${props.className}`
  return (
    <input
      type="text"
      placeholder="Search for # or @"
      {...props}
      className={classNames}
    />
  )
}
