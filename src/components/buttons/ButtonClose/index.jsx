import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  element,
} from './style'

import Cross from './cross'
// import Plus from './plus'

const ButtonClose = ({
  onClick,
  className,
}) => {

  return (
    <span className={`${element} ${className}`}><Cross /></span>
  )
}

export default ButtonClose
