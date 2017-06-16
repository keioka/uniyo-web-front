/* @flow */
import React, { PropTypes } from 'react'

import {
  inputText,
} from './style'

const InputTextTransparent = (props, { className, type }) => {
  const classNames = `${inputText} ${className}`
  return (
    <input
      type={type}
      {...props}
      className={classNames}
    />
  )
}

InputTextTransparent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['password', 'text']),
}

InputTextTransparent.defaultProps = {
  type: 'password',
}

export default InputTextTransparent
