import React, { Component, PropTypes } from 'react'

import {
  element,
} from './style'


const InputSearchTag = (props) => {
  const classNames = `${element} ${props.className}`
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
