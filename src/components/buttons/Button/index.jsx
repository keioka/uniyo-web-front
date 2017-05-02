import React, { Component, PropTypes } from 'react'

import {
  button,
  buttonPrimary,
  buttonDanger,
  buttonOption,
} from './style'

export default (props) => {
  const buttonType = props.type
  let classNames = [button]
  switch (buttonType) {
    case 'primary': {
      classNames.push(buttonPrimary)
      break
    }
    case 'danger': {
      classNames.push(buttonDanger)
      break
    }
    case 'option': {
      classNames.push(buttonOption)
      break
    }
    default: {
      break
    }
  }

  const className = classNames.join(" ")

  return (
    <button className={className} {...props}>{props.children}</button>
  )
}
