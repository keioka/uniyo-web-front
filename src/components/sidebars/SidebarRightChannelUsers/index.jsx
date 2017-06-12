import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FaSearch from 'react-icons/lib/fa/search'

import {
  ListUserDonutGive,
} from '../../'

import {
  wrapper,
  header,
  headerNav,
  headerNavActive,
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
    const { channelUsers, channelCreate, allChannels } = this.props
    return channelUsers.map(user =>
      <ListUserDonutGive
        {...user}
        channelCreate={channelCreate}
        channels={allChannels}
      />
    )
  }

  render() {
    const { channelUsers } = this.props
    return (
      <div className={wrapper}>
        <div className={header}>
          <h3>All user in this channel</h3>
        </div>
        <div className={ul}>
          <div className={inputSearchWrapper}>
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
          </div>
          <ul>
            {this.usersDonutsToGive}
          </ul>
        </div>
      </div>
    )
  }
}

export default SidebarRightChannelUsers
