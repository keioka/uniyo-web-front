import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { browserHistory } from 'react-router'

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


const ListUserDonutGive = ({ id: userId, name, image, channels, channelCreate }) => {

  const onClickBtnMessage = () => {
    const filteredChannel = channels.filter(channel => {
      // check if current user has channel with the other user
      // check channel is not group because it is supposed to be 1 to 1 chat
      // check if the other user id is included. [0] is the other user and [1] is current user
      return channel.users.length === 2 && channel.users[0].id == userId
    })

    const channel = filteredChannel[0]

    if (channel) {
      browserHistory.push(`/dashboard/channels/${channel.id}`)
    } else {
      channelCreate({ users: [userId] })
    }
  }


  return (
    <li key={userId} className={wrapper}>
      <span className={boxImage}>
        <img src={image.smallUrl} className={imgUser} />
      </span>
      <div className={boxInfo}>
        <div className={boxInfoLeft}>
          <span className={fontName}><b>{name}</b></span>
          <span className={fontLink} onClick={() => onClickBtnMessage()}>send message</span>
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