/* @flow */
import React, { Component, PropTypes } from 'react'

import {
  element,
  primary,
  danger,
  option,
} from './style'

const Button = ({ className, type, children }) => {
  let classNames = [element, className]
  switch (type) {
    case 'primary': {
      classNames.push(primary)
      break
    }
    case 'danger': {
      classNames.push(danger)
      break
    }
    case 'option': {
      classNames.push(option)
      break
    }
    default: {
      break
    }
  }

  return (
    <button className={classNames.join(' ')}>{children}</button>
  )
}

export default Button
