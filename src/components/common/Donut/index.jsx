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
export default class Donut extends Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.color !== this.props.color || nextProps.count !== this.props.count) {
      return true
    }
    return false
  }

  render() {
    const { color = 'RANDOM', size, id, className } = this.props
    let classNames = [className]
    let ComponentDonut

    switch (size) {
      case 'large':
      classNames.push(lg)
      break
      case 'medium':
      classNames.push(med)
      break
      case 'small':
      classNames.push(sm)
      break
      case 'xs':
      classNames.push(xs)
      break
      default:
      classNames.push(med)
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
      <ComponentDonut id={id} className={classNames.join(' ')} />
    )
  }
}
