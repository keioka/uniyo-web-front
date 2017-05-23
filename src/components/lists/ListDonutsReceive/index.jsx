import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  TextPost,
} from '../../'

import {
  boxImage,
  boxInfo,
  fontName,
  imgUser,
  wrapper,
} from './style'

const ListDonutsReceive = ({ id, fromUser, time }) => {
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={fromUser.image.smallUrl} className={imgUser} />
      </span>
      <div className={boxInfo}>
        <span className={fontName}>{fromUser.firstName} sent to you</span>
        <span className={fontName}>{moment.utc(time).local().format("HH:mm A")}</span>
      </div>
    </li>
  )
  // TODO: what if long comment
}

export default ListDonutsReceive
