import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  TextPost,
} from '../../'

import {
  fontLink,
  boxImage,
  fontName,
  fontUserNames,
  imgUser,
  wrapper,
  spanChannelInfo,
  iconUsersCount,
} from './style'

const ListRecentConversation = ({ channel }) => {
  const {
    description,
    id,
    isPrivate,
    lastMessageReadAt,
    name,
    users
  } = channel

  return (
  <Link to={`/dashboard/channels/${id}`} className={fontLink}>
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={users[0].image.smallUrl} className={imgUser} />
      </span>
      <span className={spanChannelInfo}>
        <span className={fontName} data-users-count={users.length}>
          <span className={fontUserNames}>{users.map(user => user.name).join(', ')}</span>
        </span>
      </span>
    </li>
  </Link>
  )
  // TODO: what if long comment
}

export default ListRecentConversation
