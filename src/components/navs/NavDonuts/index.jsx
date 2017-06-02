import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  Donut,
} from '../../'


import {
  boxDonuts,
  boxDonutsRow,
  receiveDonutsActive,
} from './style'

export default class NavDonuts extends Component {
  render() {
    const {
      availableDonutsCount,
      receivedDonutsCount,
      isReceiveDonuts,
      donutsShake,
    } = this.props

    console.log(isReceiveDonuts)
    const donutsReceiveClassName = isReceiveDonuts ? receiveDonutsActive : null

    if (isReceiveDonuts) {
      setTimeout(() => donutsShake(), 1000)
    }

    return (
      <div className={boxDonuts}>
        <span className={boxDonutsRow}><Donut id="available-donuts" size="large" count={availableDonutsCount} />{availableDonutsCount}</span>
        <span className={boxDonutsRow}><Donut id="received-donuts" className={donutsReceiveClassName} size="large" count={receivedDonutsCount} />{receivedDonutsCount}</span>
      </div>
    )
  }
}
