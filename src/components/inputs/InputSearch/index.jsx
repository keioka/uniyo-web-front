/* @flow */
import React, { Component, PropTypes } from 'react'
import IconSearch from './search-icon.svg'

import {
  wrapper,
  element,
} from './style.scss'

const InputSearch = (props) => {
  const classNames = `${wrapper} ${props.className}`
  return (
    <div className={classNames}>
      <IconSearch />
      <input
        type="text"
        {...props}
        className={element}
        ref={props.refTo}
      />
    </div>
  )
}

export default InputSearch
