import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  TextPost,
  DonutPlusOne,
} from '../../'

import {
  boxImage,
  boxInfo,
  fontName,
  fontTime,
  imgUser,
  wrapper,
  boxInfoLeft,
  boxInfoRight,
} from './style'

const ListDonutsReceive = ({ id, fromUser, time }) => {
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={fromUser.image.smallUrl} className={imgUser} />
      </span>
      <div className={boxInfo}>
        <div className={boxInfoLeft}>
          <span className={fontName}><b>{fromUser.firstName} {fromUser.lastName}</b> sent to you</span>
          <span className={fontTime}>{moment.utc(time).local().format("HH:mm A")}</span>
        </div>
        <div className={boxInfoRight}>
          <DonutPlusOne />
        </div>
      </div>
    </li>
  )
  // TODO: what if long comment
}

export default ListDonutsReceive
