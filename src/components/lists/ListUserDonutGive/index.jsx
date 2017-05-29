import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  TextPost,
  DonutPlusOne,
  ButtonDonut,
} from '../../'

import {
  boxImage,
  fontName,
  fontLink,
  fontTime,
  imgUser,
  wrapper,
  boxInfo,
  boxInfoLeft,
  boxInfoRight,
} from './style'

const ListUserDonutGive = ({ id, name, image, }) => {
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={image.smallUrl} className={imgUser} />
      </span>
      <div className={boxInfo}>
        <div className={boxInfoLeft}>
          <span className={fontName}><b>{name}</b></span>
          <span className={fontLink}>send message</span>
        </div>
        <div className={boxInfoRight}>
          <ButtonDonut />
        </div>
      </div>
    </li>
  )
  // TODO: what if long comment
}

export default ListUserDonutGive
