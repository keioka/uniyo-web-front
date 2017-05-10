import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  wrapper,
} from './style'

const SidebarRightChannelUsers = ({ channelUsers }) => {
  return (
    <div className={wrapper} >
      <ul>
        {channelUsers && channelUsers.map(user => {
          return (<li>{user.name}</li>)
        })}
      </ul>
    </div>
  )
}

export default SidebarRightChannelUsers
