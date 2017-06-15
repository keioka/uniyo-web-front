import React, { Component, PropTypes } from 'react'

import {
  TextPost,
} from '../../'

import {
  boxImage,
  fontName,
  imgUser,
  wrapper,
  spanChannelInfo,
  fontUserNames,
} from './style'

const ListNewChatUser = ({ user, onClick }) => {
  const { id, image, name } = user
  return (
    <li key={id} className={wrapper} onClick={() => onClick(user)}>
      <span className={boxImage}>
        <img src={image.smallUrl} className={imgUser} />
      </span>
      <span className={spanChannelInfo}>
        <span className={fontName}>
          <span className={fontUserNames}>{user.name}</span>
        </span>
        <p></p>
      </span>
    </li>
  )
  // TODO: what if long comment
}

export default ListNewChatUser
