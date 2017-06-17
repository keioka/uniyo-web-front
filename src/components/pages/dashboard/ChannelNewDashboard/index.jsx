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

  get channels() {
    const {
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allMessages,
      allChannels,
      messageCreate,
    } = this.props

    const query = new RegExp(this.state.query, "g")
    const a = this.state.query ? allChannels.filter(channel => channel.users.map(user => user.name).includes(name => query.test(name))) : allChannels

    const isChannelUser = (channel) => { console.log('channel', channel); return channel.users.includes(user => { alert('user', user.name); return query.test(user.name) }) }
    console.log(this.state.query, query, allChannels.filter(channel => isChannelUser))

    return a.map(channel =>
      <ListRecentConversation channel={channel} currentUser={currentUser} />
    )
  }

  get suggestionedUsers() {
    const { suggestionedUsers } = this.props
    const query = new RegExp(this.state.query, "y")
    return suggestionedUsers.filter(user => query.test(user.name)).map(user => <ListNewChatUser user={user} onClick={::this.onSelectedUser} />)
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

          <div className={section}>
            <h4 className={sectionTitle}>Recent Conversation</h4>
            <ul className={sectionUl}>
              {this.channels}
            </ul>
          </div>
          <div className={section}>
            <h4 className={sectionTitle}>Campus Directory</h4>
            <ul className={sectionUl}>
              {this.suggestionedUsers}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
