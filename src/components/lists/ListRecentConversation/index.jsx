import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  TextPost,
} from '../../'

import {
  boxImage,
  fontName,
  imgUser,
  wrapper,
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
  <Link to={`/dashboard/channels/${id}`}>
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={users[0].image.smallUrl} className={imgUser} />
      </span>
      <span className={fontName}>{users.map(user => user.name).join(', ')}</span>
    </li>
  </Link>
  )
  // TODO: what if long comment
}

export default ListRecentConversation
