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

export default class ListRecentConversation extends Component {
  render () {
    const { channel, channelUsers, currentUser } = this.props
    const {
      description,
      id,
      isPrivate,
      lastMessageReadAt,
      name,
      mostRecentMessage,
    } = channel

    const filterdUsers = channelUsers && usersWithoutCurrentUser(channelUsers, currentUser)

    const userImage = () => {
      if (filterdUsers && filterdUsers.length < 2) {
        return (<img src={filterdUsers[0].image.smallUrl} className={imgUser} />)
      } else {
        return (
          <div className={boxMultipleUserImages}>
            <img src={filterdUsers && filterdUsers[0].image.smallUrl} className={imgUserOne} />
            <img src={filterdUsers && filterdUsers[1].image.smallUrl} className={imgUserTwo} />
          </div>
        )
      }
    }

    const createdAt = mostRecentMessage && mostRecentMessage.createdAt && moment(mostRecentMessage.createdAt).local().fromNow()
    const lastMessage = mostRecentMessage && mostRecentMessage.text
    return (
      <Link to={`/dashboard/channels/${id}`} className={fontLink}>
        <li key={id} className={wrapper}>
          <span className={boxImage}>
            {userImage()}
          </span>
          <span className={spanChannelInfo}>
            <span className={fontName} data-users-count={filterdUsers && filterdUsers.length}>
              <span className={fontUserNames}>{filterdUsers && filterdUsers.map(user => user.name).join(', ')}</span>
              <span className={fontTime}>{createdAt}</span>
            </span>
            <p>{description === null || description === "undefined" ? lastMessage : description}</p>
          </span>
        </li>
      </Link>
    )
  }
}
