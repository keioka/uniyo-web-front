/* @flow */
import React, { PropTypes } from 'react'

import {
  inputText,
} from './style'

const InputTextTransparent = (props) => {
  const classNames = `${inputText} ${props.className}`
  return (
    <input
      type={props.type}
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
  type: 'text',
}

export default InputTextTransparent
