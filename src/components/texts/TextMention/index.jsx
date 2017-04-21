import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import reactStringReplace from 'react-string-replace'

import {
  mention,
} from './style'

export default ({ userId, display }) => (<span className={mention}>@{display}</span>)
