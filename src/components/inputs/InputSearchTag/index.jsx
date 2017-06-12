import React, { Component, PropTypes } from 'react'
import FaSearch from 'react-icons/lib/fa/search'

import {
  wrapper,
  element,
} from './style'

import IconSearch from './search-icon'

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
