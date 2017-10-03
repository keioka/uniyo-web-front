import React, { PropTypes } from 'react'
import moment from 'moment'

import {
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
} from './style.scss'

const ItemDonutsReceive = ({ id, fromUser, time }) => {
  const { firstName, lastName, name, image } = fromUser
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={image.smallUrl} className={imgUser} alt={name} />
      </span>
      <div className={boxInfo}>
        <div className={boxInfoLeft}>
          <span className={fontName}><b>{firstName} {lastName}</b> sent you a donut!</span>
          <span className={fontTime}>{moment.utc(time).local().format('HH:mm A')}</span>
        </div>
        <div className={boxInfoRight}>
          <DonutPlusOne />
        </div>
      </div>
    </li>
  )
  // TODO: what if long comment
}

ItemDonutsReceive.propTypes = {
  id: PropTypes.number.isRequired,
  fromUser: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
}

export default ItemDonutsReceive
