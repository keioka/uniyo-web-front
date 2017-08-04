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
  wrapper,
  header,
  headerNav,
  headerNavActive,
  ul,
  inputSearch,
  inputSearchWrapper,
  listUserInvite,
  listUserInviteLeft,
  listUserInviteRight,
  listUserInviteLeftImg,
  listUserInviteLeftText,
  listUserInviteLeftTitle,
  listUserInviteLeftSubtitle,
} from './style'

import {
  ItemDonutsReceive,
  ItemUserDonutGive,
  ButtonDonut,
} from '../../'

export default class SidebarRightHistoryDonuts extends Component {

  state = {
    type: 1,
    userSearchQuery: '',
  }

  get usersDonutsToGive() {
    const { allUsers, userSearch, channelCreate, allChannels, userGiveDonuts, currentUser } = this.props
    const filteredUsers = allUsers && this.state.userSearchQuery !== '' ? allUsers.filter(user => user.name.toLowerCase().includes(this.state.userSearchQuery)) : allUsers

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

    return filteredUsers.map(user =>
      <ItemUserDonutGive
        {...user}
        onClickBtnMessage={onClickBtnMessage}
        channelCreate={channelCreate}
        channels={allChannels}
        userGiveDonuts={userGiveDonuts}
        currentUser={currentUser}
      />
    )
  }

  render() {
    const {
      donutsHistory,
      allUsers,
      userSearch,
      channelCreate,
      allChannels,
      currentUser,
      userGiveDonuts,
    } = this.props

    const classNamesFirstTab = this.props.rightbar.donutsHistoryTabNumber === 0 ? [headerNav, headerNavActive] : [headerNav]
    const classNamesSecondTab = this.props.rightbar.donutsHistoryTabNumber === 1 ? [headerNav, headerNavActive] : [headerNav]
    const onClickNavDonuts = tabNumber => this.props.showHistoryDonut(tabNumber)
    const onChangeSearchCampus = (event) => { this.setState({ userSearchQuery: event.target.value }); userSearch({ query: event.target.value }) }

    return (
      <div className={wrapper} >
        <div className={header}>
          <span className={classNamesFirstTab.join(' ')} data-count={currentUser.availableDonutsCount} onClick={() => onClickNavDonuts(0)}>TO GIVE 😍</span>
          <span className={classNamesSecondTab.join(' ')} data-count={currentUser.receivedDonutsCount} onClick={() => onClickNavDonuts(1)}>RECEIVED</span>
        </div>

        {this.props.rightbar.donutsHistoryTabNumber === 0 ?
          (<ul className={ul}>
            <div className={inputSearchWrapper}>
              <FaSearch />
              <input
                type="text"
                className={inputSearch}
                placeholder="Search in your campus"
                onChange={onChangeSearchCampus}
              />
            </div>
            <div className={listUserInvite}>
              <div className={listUserInviteLeft}>
                <div className={listUserInviteLeftImg}></div>
                <div className={listUserInviteLeftText}>
                  <span className={listUserInviteLeftTitle}>Invite Friend</span>
                  <span className={listUserInviteLeftSubtitle}>With a donut</span>
                </div>
              </div>
              <span className={listUserInviteRight}><ButtonDonut donutsCount={0} /></span>
            </div>
            {this.usersDonutsToGive}

          </ul>) :
          (<ul className={ul}>
            {donutsHistory && donutsHistory.map(history => <ItemDonutsReceive {...history}  />)}
          </ul>)
        }
      </div>
    )
  }
}
