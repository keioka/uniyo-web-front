import React, { Component, PropTypes } from 'react'

import {
  input,
} from './style'


const InputSearchTag = (props) => {
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

export default InputSearchTag
