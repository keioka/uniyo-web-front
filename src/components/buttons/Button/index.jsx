/* @flow */
import React, { Component, PropTypes } from 'react'

import {
  element,
  primary,
  danger,
  option,
} from './style.scss'

type Props = {
  className: String,
  donutsCount: Number,
  onClick: Function,
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  className: '',
  type: 'primary',
  onClick: () => {},
}

const Button = ({ className, type, children, onClick }) => {
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
    <button className={classNames.join(' ')} onClick={onClick}>{children}</button>
  )
}


export default Button
