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

const NavChannel = ({ channel, showUserInfo, showChannelUsers }) => {
  const MAX_LENGTH_USERS = 7
  const allChannelUsers = channel ? channel.users : []
  const slicedUsers = allChannelUsers.slice(0, MAX_LENGTH_USERS - 1)
  const numberUsersRest = allChannelUsers.length - MAX_LENGTH_USERS
  return (
    <nav className={wrapper}>
      <ul className={ul}>
        {channel && slicedUsers && slicedUsers.map(user => {
          return (
            <li className={iconUser} onClick={() => showUserInfo(user.id)}>
              <img src={user.image.smallUrl} alt="" className={iconUserImg} />
              <span className={iconUserOnlineStatus}></span>
              <span className={iconUserName}>{user.name}</span>
            </li>
          )
        })}
        {
          numberUsersRest > 0 &&
          <li className={iconUserNumber} onClick={() => showChannelUsers(channel.users)}><span>{numberUsersRest}</span></li>
        }
        <li className={iconSetting} onClick={() => showChannelUsers(channel.users)}><Setting /></li>
      </ul>
    </nav>
  )
}

export default NavChannel
