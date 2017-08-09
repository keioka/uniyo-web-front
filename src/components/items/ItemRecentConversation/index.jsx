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
  iconOnline,
  iconOffline,
  iconUsersCount,
} from './style'

export default class ItemRecentConversation extends Component {
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

    const filteredUsers = channelUsers && usersWithoutCurrentUser(channelUsers, currentUser)

    const userImage = () => {
      if (filteredUsers && filteredUsers.length < 2) {
        const image = filteredUsers[0] && filteredUsers[0].image.mediumUrl
        return (<img src={image} className={imgUser} />)
      } else {
        return (
          <div className={boxMultipleUserImages}>
            <img src={filteredUsers && filteredUsers[0] && filteredUsers[0].image.mediumUrl} className={imgUserOne} />
            <img src={filteredUsers && filteredUsers[1] && filteredUsers[1].image.mediumUrl} className={imgUserTwo} />
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
            <span className={fontName}>
              {filteredUsers && filteredUsers.length > 1 && <span className={iconUsersCount}>{filteredUsers.length}</span>}
              {filteredUsers && filteredUsers.length === 1 && filteredUsers[0].isOnline ? <span className={iconOnline}></span> : <span className={iconOffline}></span>}
              <span className={fontUserNames}>{filteredUsers && filteredUsers.map(user => user && user.name).join(', ')}</span>
              <span className={fontTime}>{createdAt}</span>
            </span>
            <p>{description === null || description === "undefined" ? lastMessage : description}</p>
          </span>
        </li>
      </Link>
    )
  }
}
