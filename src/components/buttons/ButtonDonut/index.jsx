import React, { Component, PropTypes } from 'react'

import {
  Donut,
} from '../../'

import {
  element,
} from './style'

const ButtonDonuts = ({ className, donutsCount, onClickDonutsHandler, onClick }) => {
  const classNames = `${element} ${className}`
  return (
    <button
      className={classNames}
      data-role='give-donuts'
      data-count={donutsCount}
      onClick={onClick}
    >
      <Donut size="xs" />
    </button>
  )
}

export default ButtonDonuts
