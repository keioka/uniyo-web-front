import React, { Component, PropTypes } from 'react'

import {
  TextPost,
} from '../../'

import {
  boxImage,
  fontName,
  imgUser,
  wrapper,
  sectionContent,
  paragaph,
} from './style'

const ListMessage = ({ messages, showUserInfo }) => {
  const message = messages[0]
  const { id, user } = message
  return (
    <li key={id} className={wrapper}>
      <div className={boxImage}>
        <img src={user.image.smallUrl} className={imgUser} />
      </div>
      <div className={sectionContent}>
        <span className={fontName}>{user.firstName}</span>
        {messages.map(message => <p className={paragaph}><TextPost text={message.text} showUserInfo={showUserInfo} /></p>)}
      </div>
    </li>
  )
  // TODO: what if long comment
}

export default ListMessage
