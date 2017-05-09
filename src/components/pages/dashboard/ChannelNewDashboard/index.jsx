/* @flow */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {
  ListNewChatUser,
  ListRecentConversation,
  InputSearchUser,
} from '../../../index'

import {
  wrapper,
  tagUser,
  content,
  header,
  btn,
  btnClose,
  btnCloseText,
  headerForm,
  section,
  sectionTitle,
  sectionUl,
  headerTitle,
  headerSectionSelectedUser,
} from './style'

import Cross from './cross'

export default class ChannelNewDashboard extends Component {

  static defaultProps = {
  }

  state = {
    form: [],
    selectedUsers: []
  }

  onSelectedUser(user) {
    const { selectedUsers } = this.state
    const newSelectedUsers = selectedUsers
    newSelectedUsers.push(user)
    this.setState({
      selectedUsers: newSelectedUsers
    })
  }

  onDeleteSelectedUser(index) {
    const { selectedUsers } = this.state
    const newSelectedUsers = selectedUsers
    newSelectedUsers.splice(index, 1)
    this.setState({
      selectedUsers: newSelectedUsers
    })
  }

  onSubmit() {
    if (this.state.selectedUsers.length > 0) {
      const params = {
        users: this.state.selectedUsers.map(user => user.id),
      }
      this.props.channelCreate(params)
    }
    // TODO: add alert
  }

  render() {
    const {
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allMessages,
      allChannels,
      messageSearch,
      messageCreate,
    } = this.props

    const messages = allMessages.filter(message => message.channelId == channelId)
    const { hashtags: hashtagsCurrentUser, image } = currentUser

    return (
      <div ref={(div)=> this._dashboard = div} className={wrapper}>
        <div className={btnClose}>
          <Link to='/dashboard'><Cross /></Link>
          <span className={btnCloseText}>close</span>
        </div>
        <div className={content}>
          <div className={header}>
            <h3 className={headerTitle}>Start a private chat</h3>
            <div className={headerForm}>
              <InputSearchUser
                onChange={event => userSearch({ query: event.target.value })}
              />
              <button className={btn} onClick={::this.onSubmit}>Start</button>
            </div>
            <div className={headerSectionSelectedUser}>
              {this.state.selectedUsers &&
               this.state.selectedUsers.map((user, index) =>
                 <span
                   className={tagUser}
                   onClick={() => ::this.onDeleteSelectedUser(index)}
                 >
                   { user.name }
                 </span>)
               }
            </div>
          </div>
          <div className={section}>
            <h4 className={sectionTitle}>Recent Conversation</h4>
            <ul className={sectionUl}>
              {allChannels && allChannels.map(channel => <ListRecentConversation channel={channel} />)}
            </ul>
          </div>
          <div className={section}>
            <h4 className={sectionTitle}>Campus Directory</h4>
            <ul className={sectionUl}>
              {suggestionedUsers && suggestionedUsers.map(user => <ListNewChatUser user={user} onClick={::this.onSelectedUser} />)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
