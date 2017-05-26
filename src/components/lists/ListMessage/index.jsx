import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  TextPost,
} from '../../'

import {
  boxImage,
  fontName,
  fontTime,
  imgUser,
  wrapper,
  sectionContent,
  paragaph,
} from './style'

const ListMessage = ({ messages, showUserInfo }) => {
  const message = messages[0]
  const { id, user } = message
  const time = moment.utc(message.createdAt).local().format("HH:mm A")
  return (
    <li key={id} className={wrapper}>
      <div className={boxImage}>
        <img src={user.image.smallUrl} className={imgUser} />
      </div>
      <div className={sectionContent}>
        <span className={fontName}>{user.firstName}</span>
        <span className={fontTime}>{time}</span>
        {messages.map(message => <p className={paragaph}><TextPost text={message.text} showUserInfo={showUserInfo} /></p>)}
      </div>
    </li>
  )
  // TODO: what if long comment
}

export default ListMessage
