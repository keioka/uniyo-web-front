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
  iconOnline,
  iconOffline,
} from './style'

import Setting from './setting'

class NavChannel extends Component {
  render() {
    const { channel, channelUsers, showUserInfo, showChannelUsers } = this.props
    const MAX_LENGTH_USERS = 7
    const allChannelUsers = channelUsers ? channelUsers : []
    const slicedUsers = allChannelUsers.slice(0, MAX_LENGTH_USERS - 1)
    const numberUsersRest = allChannelUsers.length - MAX_LENGTH_USERS
    const channelUserIds = channel && channel.users
    return (
      <nav className={wrapper}>
        <ul className={ul}>
          {channel && slicedUsers && slicedUsers.map(user => {
            return (
              <li className={iconUser} onClick={() => user && showUserInfo(user.id)}>
                <img src={user && user.image.smallUrl} alt="" className={iconUserImg} />
                <span className={iconUserOnlineStatus}>{user && user.isOnline ? <span className={iconOnline} /> : <span className={iconOffline} />}</span>
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
}


export default NavChannel
