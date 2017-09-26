import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  element,
} from './style.scss'

import Cross from './cross'
// import Plus from './plus'

const ButtonClose = ({
  onClick,
  className,
}) => {

  return (
    <span className={`${element} ${className}`} onClick={onClick}><Cross /></span>
  )
}

export default ButtonClose
