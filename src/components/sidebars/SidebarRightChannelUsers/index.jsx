import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import FaSearch from 'react-icons/lib/fa/search'

import {
  decorator,
} from '../../../utils'

const {
  usersWithoutCurrentUser,
} = decorator

import {
  ItemUserDonutGive,
} from '../../'

import {
  wrapper,
  header,
  headerNav,
  headerNavActive,
  main,
  ul,
  inputSearch,
  inputSearchWrapper,
  listUser,
  listUserLeft,
  listUserRight,
  listUserLeftImg,
  listUserLeftText,
  listUserLeftTitle,
  listUserLeftSubtitle,
} from './style'


class SidebarRightChannelUsers extends Component {

  get usersDonutsToGive() {
    const {
      channelUsers,
      channelCreate,
      allChannels,
      allUsers,
      userGiveDonuts,
      currentUser
    } = this.props

    const onClickBtnMessage = (userId) => {
      const filteredChannel = allChannels.filter(channel => {
        const channelUsers = channel.users.map(userId => allUsers.filter(user => user.id === userId)[0])
        const users = usersWithoutCurrentUser(channelUsers, currentUser)
        // check if current user has channel with the other user
        // check channel is not group because it is supposed to be 1 to 1 chat
        // check if the other user id is included. [0] is the other user and [1] is current user
        return users.length === 1 && users[0].id == userId
      })

      const channel = filteredChannel[0]

      if (channel) {
        browserHistory.push(`/dashboard/channels/${channel.id}`)
      } else {
        channelCreate({ users: [userId] })
      }
    }

    return channelUsers && channelUsers.map(user =>
      <ItemUserDonutGive
        {...user}
        onClickBtnMessage={onClickBtnMessage}
        userGiveDonuts={userGiveDonuts}
        channelCreate={channelCreate}
        channels={allChannels}
        currentUser={currentUser}
      />
    )
  }

  render() {
    const { channelUsers } = this.props
    return (
      <div className={wrapper}>
        <div className={header}>
          <h3>All users in this channel</h3>
        </div>
        <div className={main}>
          {/* <div className={inputSearchWrapper}>
            <FaSearch />
            <input
              type="text"
              className={inputSearch}
              placeholder="Search in your campus"
              onChange={event => { this.setState({ userSearchQuery: event.target.value }); userSearch({ query: event.target.value }) }}
            />
          </div>
          <div className={listUser}>
            <div className={listUserLeft}>
              <div className={listUserLeftImg}></div>
              <div className={listUserLeftText}>
                <span className={listUserLeftTitle}>Add Friend</span>
              </div>
            </div>
          </div> */}
          <ul className={ul}>
            {this.usersDonutsToGive}
          </ul>
        </div>
      </div>
    )
  }
}

export default SidebarRightChannelUsers
