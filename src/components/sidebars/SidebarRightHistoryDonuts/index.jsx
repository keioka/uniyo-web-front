import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  wrapper,
  header,
} from './style'

import {
  ListDonutsReceive,
} from '../../'

export default ({ donutsHistory }) => {
  return (
    <div className={wrapper} >
      <div className={header}>
        <span>Donuts to give (2)</span>
        <span>Donuts receive (2)</span>
      </div>
      {donutsHistory && donutsHistory.map(history => <ListDonutsReceive {...history} />)}
    </div>
  )
}
