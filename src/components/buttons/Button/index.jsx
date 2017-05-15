import React, { Component, PropTypes } from 'react'

import {
  element,
  primary,
  danger,
  option,
} from './style'

export default (props) => {
  const buttonType = props.type
  let classNames = [element, props.className]
  switch (buttonType) {
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
    <button {...props} className={classNames.join(' ')}>{props.children}</button>
  )
}
