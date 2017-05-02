import React, { Component, PropTypes } from 'react'

import {
  inputText
} from './style'

export default (props) => {
  const classNames = `${inputText} ${props.className}`
  const type = props.type === "password" ? "password" : "text"
  return (
    <input
      type={type}
      {...props}
      className={classNames}
    />
  )
}
