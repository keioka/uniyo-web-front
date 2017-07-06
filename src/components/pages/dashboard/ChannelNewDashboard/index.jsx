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
        query: event.target.value,
        isShowRecentConversation: false,
      })
    } else if (event.target.value == '') {
      this.setState({
        query: '',
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

  get suggestionedUsers() {
    const { suggestionedUsers } = this.props
    const query = new RegExp(`^${this.state.query ? this.state.query.toLowerCase() : ''}`)
    return suggestionedUsers
    .filter(user => query.test(user.name.toLowerCase()))
    .map(user => <ListNewChatUser user={user} onClick={::this.onSelectedUser} />)
  }

  get channels() {
    const {
      currentUser,
      allChannels,
    } = this.props
    return allChannels.map(channel =>
      <ListRecentConversation channel={channel} currentUser={currentUser} />
    )
  }

  get filteredChannels() {
    const {
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allMessages,
      allChannels,
      messageCreate,
    } = this.props

    const query = new RegExp(`^${this.state.query ? this.state.query.toLowerCase() : ''}`)
    const matchUserName = name => query.test(name.toLowerCase())
    const filterUsers = channel => channel.users.map(user => user.name).some(matchUserName)
    const channels = this.state.query ? allChannels.filter(filterUsers) : []
    console.log(channels)
    const isChannelUser = (channel) => channel.users.includes(user => { alert('user', user.name); return query.test(user.name) })
    return channels.map(channel =>
      <ListRecentConversation channel={channel} currentUser={currentUser} />
    )
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
                    {user.name}
                  </span>)
                }
              </div>
            </div>
            {this.state.isShowRecentConversation &&
              <div className={section}>
                <h4 className={sectionTitle}>Recent Conversation</h4>
                <ul className={sectionUl}>
                  {this.channels}
                </ul>
              </div>
            }
            {this.state.query !== '' &&
              <div className={section}>
                <ul className={sectionUl}>
                  {this.filteredChannels}
                  {this.suggestionedUsers}
                </ul>
              </div>
            }
          </div>
        </div>
      )
    }
  }
