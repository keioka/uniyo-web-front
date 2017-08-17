/* @flow */
import React, { Component, PropTypes } from 'react'

import {
  input,
} from './style.scss'

const InputSearchUser = (props, { className }) => {
  const classNames = `${input} ${className}`
  return (
    <input
      type="text"
      placeholder="Find or start a conversation, search by name or by #hashtag"
      {...props}
      className={classNames}
    />
  )
}

InputSearchUser.propTypes = {
  className: PropTypes.string,
}

export default InputSearchUser
