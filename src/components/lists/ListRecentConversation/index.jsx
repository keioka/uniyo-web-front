import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { decorator } from '../../../utils'
import moment from 'moment'

const { usersWithoutCurrentUser } = decorator

import {
  TextPost,
} from '../../'

import {
  fontLink,
  boxImage,
  boxMultipleUserImages,
  fontName,
  fontUserNames,
  fontTime,
  imgUser,
  imgUserOne,
  imgUserTwo,
  wrapper,
  spanChannelInfo,
  iconUsersCount,
} from './style'

const ListRecentConversation = ({ channel, currentUser }) => {
  const {
    description,
    id,
    isPrivate,
    lastMessageReadAt,
    name,
    users,
    mostRecentMessage,
  } = channel

  const filterdUsers = usersWithoutCurrentUser(users, currentUser)

  const userImage = () => {
    if (filterdUsers.length < 2) {
      return (<img src={filterdUsers[0].image.smallUrl} className={imgUser} />)
    } else {
      return (
        <div className={boxMultipleUserImages}>
          <img src={filterdUsers[0].image.smallUrl} className={imgUserOne} />
          <img src={filterdUsers[1].image.smallUrl} className={imgUserTwo} />
        </div>
      )
    }
  }

  return (
    <Link to={`/dashboard/channels/${id}`} className={fontLink}>
      <li key={id} className={wrapper}>
        <span className={boxImage}>
          {userImage()}
        </span>
        <span className={spanChannelInfo}>
          <span className={fontName} data-users-count={users.length}>
            <span className={fontUserNames}>{users.map(user => user.name).join(', ')}</span>
            <span className={fontTime}> {moment(mostRecentMessage.createdAt).local().fromNow()}</span>
          </span>
          <p>{description === null || description === "undefined" ? mostRecentMessage.text : description}</p>
        </span>
      </li>
    </Link>
  )
}

export default ListRecentConversation
