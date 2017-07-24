import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  wrapper,
  ul,
  iconUser,
  iconUserOnlineStatus,
  iconUserName,
  iconUserImg,
  iconUserNumber,
  iconSetting,
} from './style'

import Setting from './setting'

const NavChannel = ({ channel, channelUsers, showUserInfo, showChannelUsers }) => {
  const MAX_LENGTH_USERS = 7
  const allChannelUsers = channelUsers ? channelUsers : []
  const slicedUsers = allChannelUsers.slice(0, MAX_LENGTH_USERS - 1)
  const numberUsersRest = allChannelUsers.length - MAX_LENGTH_USERS
  const channelUserIds = channel && channel.users
  return (
    <nav className={wrapper}>
      <ul className={ul}>
        {channel && slicedUsers && slicedUsers.map(user => {
          console.warn('user', user)
          return (
            <li className={iconUser} onClick={() => user && showUserInfo(user.id)}>
              <img src={user && user.image.smallUrl} alt="" className={iconUserImg} />
              <span className={iconUserOnlineStatus}></span>
              <span className={iconUserName}>{user && user.name}</span>
            </li>
          )
        })}
        {
          numberUsersRest > 0 &&
          <li className={iconUserNumber} onClick={() => channelUsers && showChannelUsers(channelUserIds)}><span>{numberUsersRest}</span></li>
        }
        <li className={iconSetting} onClick={() => channelUsers && showChannelUsers(channelUserIds)}><Setting /></li>
      </ul>
    </nav>
  )
}

export default NavChannel
