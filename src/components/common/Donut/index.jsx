import React, { Component, PropTypes } from 'react'

import {
  lg,
  med,
  sm,
  xs,
} from './style'

import PinkDonut from './donut_pink.svg'
import GreenDonut from './donut_green.svg'
import PurpleDonut from './donut_purple.svg'
import WhiteDonut from './donut_white.svg'
import YellowDonut from './donut_yellow.svg'
import BlueDonut from './donut_blue.svg'

const allDonuts = [PinkDonut, GreenDonut, PurpleDonut, WhiteDonut, YellowDonut, BlueDonut]
const Donut = ({ color = 'RANDOM', size, id }) => {
  let className
  let ComponentDonut

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

  switch (color) {
    case 'PINK': {
      ComponentDonut = PinkDonut
      break
    }

    case 'GREEN': {
      ComponentDonut = GreenDonut
      break
    }

    case 'RANDOM': {
      const index = Math.floor(Math.random() * allDonuts.length)
      ComponentDonut = allDonuts[index]
      break
    }

    default: {
      const index = Math.floor(Math.random() * allDonuts.length)
      ComponentDonut = allDonuts[index]
      break
    }
  }

  return (
    <ComponentDonut id={id} className={className} />
  )
}

export default Donut
