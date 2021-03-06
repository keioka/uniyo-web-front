import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import reactStringReplace from 'react-string-replace'

import {
  mention,
} from './style.scss'

export default ({ userId, display, showUserInfo }) => {
  return (
    <a className={mention} onClick={() => showUserInfo(userId)}>@{display}</a>
  )
}
