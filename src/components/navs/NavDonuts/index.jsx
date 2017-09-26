import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  Donut,
  Tooltip,
} from '../../'

import {
  boxDonuts,
  boxDonutsRow,
  receiveDonutsActive,
  spentDonutsActive,
  fontEmptyDonutsCount,
} from './style.scss'

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
    //
    // if (isReceiveDonuts) {
    //   setTimeout(() => donutsShake(), 1000)
    // }
    //
    // if (isSpentDonuts) {
    //
    // }
    const isDonutsGiveAvailable = availableDonutsCount !== 0
    const textTooltipDonutsGive = isDonutsGiveAvailable ? `Today you still have ${availableDonutsCount} donuts to give` : `No more donut to give for now!`
    return (
      <div className={boxDonuts}>
        <Tooltip text={textTooltipDonutsGive} horizontal="right">
          <span className={boxDonutsRow} onClick={() => showHistoryDonut(0)}>
            <Donut
              id="available-donuts"
              className={donutsSpendClassName}
              size="medium"
              empty={availableDonutsCount === 0}
              count={availableDonutsCount}
            />
            <span className={!isDonutsGiveAvailable && fontEmptyDonutsCount}>{availableDonutsCount}</span>
          </span>
        </Tooltip>
        <Tooltip text={`You received ${receivedDonutsCount} donuts`} horizontal="right">
          <span className={boxDonutsRow} onClick={() => showHistoryDonut(1)}>
            <Donut
              id="received-donuts"
              className={donutsReceiveClassName}
              size="medium"
              count={receivedDonutsCount}
            />
            {receivedDonutsCount}
          </span>
        </Tooltip>
      </div>
    )
  }
}
