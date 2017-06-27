/* @flow */
import React, { PropTypes } from 'react'
import IconSearch from './search-icon'

import {
  wrapper,
  inputText,
  inputTextLeft,
} from './style'

const InputTextTransparent = (props) => {
  const classNames = `${wrapper} ${props.className}`
  const classNamesInput = props.type === 'search' ? `${inputText}` : `${inputText}`
  const type = props.type === 'search' ? 'text' : props.type
  return (
    <div className={classNames}>
      {props.type === 'search' && <IconSearch />}
      <input
        {...props}
        type={type}
        ref={props.refTo}
        className={classNamesInput}
      />
    </div>
  )
}

InputTextTransparent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['password', 'text', 'search']),
}

InputTextTransparent.defaultProps = {
  type: 'text',
}

export default InputTextTransparent
