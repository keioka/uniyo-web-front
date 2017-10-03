import React, { Component, PropTypes } from 'react'

import {
  lg,
  med,
  sm,
  xs,
} from './style.scss'

import PinkDonut from './plus-one-pink.svg'
import GreenDonut from './plus-one-green.svg'
import PurpleDonut from './plus-one-purple.svg'
import WhiteDonut from './plus-one-white.svg'
import YellowDonut from './plus-one-yellow.svg'
import BlueDonut from './plus-one-blue.svg'
import BrownDonut from './plus-one-brown.svg'
import BlackDonut from './plus-one-black.svg'

const allDonuts = [PinkDonut, GreenDonut, PurpleDonut, WhiteDonut, YellowDonut, BlueDonut]
const DonutPlusOne = ({ color = 'RANDOM', size, id }) => {
  let className
  let ComponentDonut

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

export default DonutPlusOne
