import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  barFilter,
  btnClose,
} from './style'

import Cross from './cross'

const BarTag = ({ type, hashtag, onClearCurrentTypeHandler }) => {
  return (
    <div
      className={barFilter}
      onClearCurrentTypeHandler={onClearCurrentTypeHandler}
    >
      <Link
        to={type ? `dashboard?type=${type}` : `dashboard`}
        className={btnClose}
      >
        <Cross />
      </Link>
      <span>#{hashtag}</span>
   </div>
  )
}

export default BarTag
