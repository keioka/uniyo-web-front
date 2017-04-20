import React, { Component, PropTypes } from 'react'

import {
  lg,
  med,
  sm,
  xs,
} from './style'

import PinkDonnut from './donnut.svg'

export default (props) => {
  const { color, size } = props
  let className

  switch (size) {
    case 'large':
      className = lg
      break
    case 'medium':
      className = med
      break
    case 'small':
      className = sm
      break
    case 'xs':
      className = xs
      break
    default:
      className = med
  }

  return (
    <PinkDonnut className={className} />
  )
}
