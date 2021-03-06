import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  ButtonClose,
} from '../../'

import {
  element,
  error,
  success,
  btn,
} from './style.scss'

import Cross from './cross.svg'
// import Plus from './plus'

const BarAuthMessage = ({
  type,
  onClick,
  children,
}) => {
  const colorBar = type === 'error' ? error : success
  const classNameBar = `${element} ${colorBar}`
  return (
    <div
      className={classNameBar}
      onClick={onClick}
    >
     {children}
     <ButtonClose onClick={onClick} />
   </div>
  )
}

BarAuthMessage.defaultProps = {
  type: 'success'
}

export default BarAuthMessage
