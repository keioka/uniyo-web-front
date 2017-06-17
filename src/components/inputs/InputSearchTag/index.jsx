/* @flow */
import React, { Component, PropTypes } from 'react'
import IconSearch from './search-icon'

import {
  wrapper,
  element,
} from './style'

const InputSearchTag = (props) => {
  const classNames = `${wrapper} ${props.className}`
  return (
    <div className={classNames}>
      <IconSearch />
      <input
        type="text"
        placeholder="Search for # or @"
        {...props}
        className={element}
      />
    </div>
  )
}

export default InputSearchTag
