import React, { Component, PropTypes } from 'react'

import {
  input,
} from './style.scss'

const InputSearchUser = (props, { className }) => {
  const classNames = `${input} ${className}`
  return (
    <input
      type="text"
      placeholder="Search for # or @"
      {...props}
      className={classNames}
    />
  )
}

export default InputSearchUser
