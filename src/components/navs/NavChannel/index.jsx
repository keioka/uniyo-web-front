import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  ul,
  iconUser,
  iconUserOnlineStatus,
  iconUserName,
  iconUserImg,
} from './style'

const NavChannel = ({ channel, showUserInfo, showChannelUsers }) => {
  return (
  <nav>
    <ul className={ul}>
      {channel && channel.users.map(user => {
        return (
          <li className={iconUser} onClick={() => showUserInfo(user.id)}>
            <img src={user.image.smallUrl} alt="" className={iconUserImg} />
            <span className={iconUserOnlineStatus}></span>
            <span className={iconUserName}>{user.name}</span>
          </li>
        )
      })}
      <li>+</li>
      <li onClick={() => showChannelUsers(channel.users)}>3</li>
    </ul>
  </nav>
  )
}

export default NavChannel
