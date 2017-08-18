/* @flow */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../../../redux/actions'
import { bindActionCreators } from 'redux'

import {
  ItemNewChatUser,
  ItemRecentConversation,
  InputSearchUser,
  ButtonClose,
} from '../../../index'

import { decorator } from '../../../../utils'
const { usersWithoutCurrentUser } = decorator

import {
  wrapper,
  iconClose,
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

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.api.auth.currentUser,
  allChannels: state.api.channels.all,
  allUsers: state.api.users.all,
  allMessages: state.api.messages.all,
  rightbar: state.ui.rightbar,
  notifications: state.api.notifications,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  userSearch: actions.userSearch,
  channelCreate: actions.channelCreate,
  showUserInfo: uiActions.showUserInfo,
  messageCreate: actions.messageCreate,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class ChannelNewDashboard extends Component {

  static defaultProps = {
  }

  state = {
    query: '',
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
    const { allUsers } = this.props
    const query = new RegExp(`^${this.state.query ? this.state.query.toLowerCase() : ''}`)
    return allUsers
    .filter(user => query.test(user.name.toLowerCase()) || (user.hashtags && user.hashtags.some(hashtag => query.test(hashtag.hashtag.toLowerCase())) ))
    .map(user => <ItemNewChatUser user={user} onClick={::this.onSelectedUser} />)
  }

  get channels() {
    const {
      allUsers,
      currentUser,
      allChannels,
    } = this.props
    const getChannelUsers = channel => channel.users.map(userId => allUsers.filter(user => user.id === userId)[0])

    return allChannels.map(channel => {
      const channelUsers = getChannelUsers(channel)
      return <ItemRecentConversation channel={channel} channelUsers={channelUsers} currentUser={currentUser} />
    })
  }

  get filteredChannels() {
    const {
      currentUser,
      allChannels,
      allUsers,
    } = this.props

    const query = new RegExp(`^${this.state.query ? this.state.query.toLowerCase() : ''}`)
    const matchUserName = user => user[0].name && query.test(user[0].name.toLowerCase())
    const filterUsers = channel => { return usersWithoutCurrentUser(channel.users.map(userId => allUsers.filter(user => user.id === userId)), currentUser).some(matchUserName) }
    const getChannelUsers = channel => channel.users.map(userId => allUsers.filter(user => user.id === userId)[0])
    const channels = this.state.query ? allChannels.filter(filterUsers) : []
    // const isChannelUser = (channel) => channel.users.includes(user => query.test(user.name))
    return channels.map(channel => {
      const channelUsers = getChannelUsers(channel)
      return <ItemRecentConversation channel={channel} channelUsers={channelUsers} currentUser={currentUser} />
    })
  }

  render() {
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
                 key={`$span_selected_user_id-${user.id}`}
                 className={tagUser}
               >
                 {user.name}
                 <ButtonClose className={iconClose} onClick={() => ::this.onDeleteSelectedUser(index)} />
               </span>)
              }
            </div>
          </div>
          {this.state.query !== '' ?
            <div className={section}>
              <ul className={sectionUl}>
                {this.filteredChannels}
                {this.suggestionedUsers}
              </ul>
            </div> :
            <div className={section}>
              <h4 className={sectionTitle}>Recent conversations</h4>
              <ul className={sectionUl}>
                {this.channels}
              </ul>
            </div>
          }
          </div>
        </div>
      )
    }
  }
