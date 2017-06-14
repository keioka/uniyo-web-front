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
    selectedUsers: [],
    isShowRecentConversation: true,
  }

  onSelectedUser(user) {
    const { selectedUsers } = this.state
    const newSelectedUsers = selectedUsers
    const isUserAlreadyIncluded = selectedUsers.some(selectedUser => selectedUser.id === user.id)
    if (!isUserAlreadyIncluded) {
      newSelectedUsers.push(user)
      this.setState({
        selectedUsers: newSelectedUsers
      })
    }
  }

  onDeleteSelectedUser(index) {
    const { selectedUsers } = this.state
    const newSelectedUsers = selectedUsers
    newSelectedUsers.splice(index, 1)
    this.setState({
      selectedUsers: newSelectedUsers
    })
  }

  onChangeInputSearchUser(event) {
    const { userSearch } = this.props
    if (event.target.value !== '') {
      userSearch({ query: event.target.value })
      this.setState({
        isShowRecentConversation: false,
      })
    } else if (event.target.value == '') {
      this.setState({
        isShowRecentConversation: true,
      })
    }
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
      messageCreate,
    } = this.props

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
                onChange={::this.onChangeInputSearchUser}
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
          { this.state.isShowRecentConversation &&
            <div className={section}>
              <h4 className={sectionTitle}>Recent Conversation</h4>
              <ul className={sectionUl}>
                {allChannels && allChannels.map(channel => <ListRecentConversation channel={channel} />)}
              </ul>
            </div>
          }
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
