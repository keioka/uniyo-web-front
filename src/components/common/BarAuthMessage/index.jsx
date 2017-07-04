import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  ButtonClose,
} from '../../'

import {
  element,
  btn,
} from './style'

import Cross from './cross'
// import Plus from './plus'

const BarAuthMessage = ({
  type,
  onClick,
  children,
}) => {

  return (
    <div
      className={element}
      onClick={onClick}
    >
     {children}
     <ButtonClose onClick={onClick} />
   </div>
  )
}

export default BarAuthMessage
