import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  Donut,
} from '../../'

import {
  boxDonuts,
  boxDonutsRow,
  receiveDonutsActive,
  spentDonutsActive,
} from './style'

export default class NavDonuts extends Component {
  render() {
    const {
      availableDonutsCount,
      receivedDonutsCount,
      isReceiveDonuts,
      isSpentDonuts,
      donutsShake,
      showHistoryDonut,
    } = this.props

    const donutsReceiveClassName = isReceiveDonuts ? receiveDonutsActive : null
    const donutsSpendClassName = isSpentDonuts ? spentDonutsActive : null

    if (isReceiveDonuts) {
      setTimeout(() => donutsShake(), 1000)
    }

    if (isSpentDonuts) {

    }

    return (
      <div className={boxDonuts}>
        <span className={boxDonutsRow} onClick={() => showHistoryDonut(0)}><Donut id="available-donuts" className={donutsSpendClassName} size="medium" count={availableDonutsCount} />{availableDonutsCount}</span>
        <span className={boxDonutsRow} onClick={() => showHistoryDonut(1)}><Donut id="received-donuts" className={donutsReceiveClassName} size="medium" count={receivedDonutsCount} />{receivedDonutsCount}</span>
      </div>
    )
  }
}
