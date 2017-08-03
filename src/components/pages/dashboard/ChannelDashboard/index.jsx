/* @flow */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../../../redux/actions'
import { bindActionCreators } from 'redux'

import moment from 'moment'
import { decorator } from '../../../../utils'
const { placeholderMessage, usersWithoutCurrentUser } = decorator

import {
  InputPost,
  ItemMessage,
} from '../../../index'

import {
  wrapper,
  wrapperShrink,
  inner,
  page,
  header,
  headerBar,
  headerBarChannelInfo,
  headerBarChannelInfoUsersCount,
  headerBarChannelInfoDescription,
  content,
  contentUl,
  sectionInput,
  sectionMessagesChunk,
  sectionMessagesChunkHeader,
  sectionMessagesChunkDate,
  sectionMessagesChunkContent,
  fontGroupName,
  fontDescription,
} from './style'


const mapStateToProps = (state, ownProps) => {
  const { channelId } = ownProps.params
  return {
    currentUser: state.api.auth.currentUser,
    allUsers: state.api.users.all,
    channel: state.api.channels.all.filter(channel => channel.id == channelId)[0],
    rightbar: state.ui.rightbar,
    isOpenRightbar: state.ui.rightbar.isOpen,
    displayTypeRightbar: state.ui.rightbar.displayType,
    dashboard: state.ui.dashboard,
    allMessages: state.api.messages.all.filter(message => message.channelId == channelId),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  messageSearch: actions.messageSearch,
  messageCreate: actions.messageCreate,
  showUserInfo: uiActions.showUserInfo,
  showChannelUsers: uiActions.showChannelUsers,

}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class ChannelDashboard extends Component {

  state = {
    init: false,
    isLazyLoading: false,
  }

  constructor() {
    super()
    this.onScrollHandler = this.onScrollHandler.bind(this)
  }

  componentDidMount() {
    const {
      messageSearch,
      params,
    } = this.props
    if (this._dashboard) {
      window.addEventListener('scroll', this.onScrollHandler)
    }
    // check if channelId is found from current user's channel reducer 'all'.
    // TODO: This is patch
    // The problem is when messageSearch is called by using old access token
    // Should make flag whether token is refreshed or not and if it true, get messageSearch action fired.
    const { channelId } = params
    const timeNow = moment.utc(new Date()).format()
    this.markNotificationRead()
    setTimeout(() => {
      messageSearch({
        limit: 50,
        channelId,
        around: timeNow,
      })
    }, 1000)

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollHandler)
  }

  componentDidUpdate(prevProps) {
    this._inputMessage.focus()
    if (prevProps.allMessages.length + 1 === this.props.allMessages.length) {
      this.scrollToBottom()
    }
    if (!this.state.init || this._dashboard.getBoundingClientRect().top > 200) {
      this.scrollToBottom()
      if (!this.state.init && prevProps.allMessages.length < this.props.allMessages.length) {
        this.setState({ init: true })
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    // console.log('nextProps', nextProps)
    // console.log('this.props', this.props)
    //
    // console.log('nextProps', nextProps.allMessages.length)
    // console.log('this.props', this.props.allMessages.length)
    if (
      this.props.allMessages.length !== nextProps.allMessages.length
    ) {
      // console.log('update')
      return true
    }
    // console.log('no update')
    return false
  }

  scrollToBottom() {
    this._dashboard.scrollTop = this._dashboard.getBoundingClientRect().height + 2270
  }

  componentWillReceiveProps(nextProps) {
    this.markNotificationRead()
    if (this.props.params.channelId != nextProps.params.channelId) {
      const { messageSearch, showChannelUsers, channel, isOpenRightbar, displayTypeRightbar } = this.props
      const { channelId } = nextProps.params
      const timeNow = moment.utc(new Date()).format()
      this.setState({ init: false })
      if (channel && isOpenRightbar && displayTypeRightbar === "ChannelUsers") {
        showChannelUsers(channel.users)
      }

      messageSearch({
        limit: 50,
        channelId,
        around: timeNow,
      })
      this.scrollToBottom()
    }

    const { allMessages, showUserInfo } = this.props
    // when new message is coming through websocket
    if (allMessages.length !== nextProps.allMessages.length) {
      this.scrollToBottom()
    }
  }

  markNotificationRead() {
    const {
      messageSearch,
      params,
      contentReadCheckNotification,
      unReadChannelIds = [],
    } = this.props
    const { channelId } = params
    const ids = unReadChannelIds.filter(idsObject => idsObject.channelId === parseInt(channelId))
    if (ids.length > 0) {
      contentReadCheckNotification({ contentType: 'MESSAGE_READ', ids })
    }
  }

  onScrollHandler(event) {
    const dashboard = this._dashboard
    const { allMessages, showUserInfo } = this.props
    const { channelId } = this.props.params

    // All messages on channel
    const messages = allMessages

    if (
      event.target.body.scrollTop <= 0
    ) {
      // TODO: fix bug 'this.props.postsSearch action dispatched twice'
      const firstMessage = messages[0]
      if (firstMessage) {
        const searchMessage = () => {
          this.props.messageSearch({
            limit: 50,
            channelId,
            before: moment.utc(firstMessage.createdAt).format(),
          })
        }
        this.setState({
          // if it is not loaded, this won't be turned to false.
          // which means engine never call this block.
          isLazyLoading: true,
        }, searchMessage)
      }

    }
  }

  messageCreate({ text, channelId }) {
    const { messageCreate } = this.props
    messageCreate({ text, channelId })
    this.scrollToBottom()
  }

  get messages() {
    const { allMessages, showUserInfo } = this.props
    const { channelId } = this.props.params
    const messages = allMessages
    const lastMessageIndex = messages.length - 1
    const allMessagesContainer = []
    // * if user is same and the message is created within 5 min, push it.
    let messagesChunk = []

    messages.forEach((message, index) => {
      // * if user is same and the message is created within 5 min, push it.
      const length = messagesChunk.length - 1
      const lastMessageOfChunk = messagesChunk[length]

      const isLastMessage = (messages.length - 1) === index
      const isSameUser = lastMessageOfChunk && message.user.id == lastMessageOfChunk.user.id
      const isInitialMessageOfChunk = messagesChunk.length === 0
      const isTimeOverFiveMinutes = messagesChunk[0] ? moment.utc(messagesChunk[0].createdAt).diff(moment.utc(message.createdAt), 'minutes') < -5 : false

      // TODO: Add time and refactoring
      // console.log('-----------------------------')
      // console.log('isLastMessage', isLastMessage)
      // console.log('isInitialMessageOfChunk', isInitialMessageOfChunk)
      // console.log('isTimeOverFiveMinutes', isTimeOverFiveMinutes)
      // console.log('isSameUser', isSameUser)

      if (isSameUser && !isTimeOverFiveMinutes) {
        messagesChunk.push(message)
      } else if (!isSameUser || isTimeOverFiveMinutes) {
        if (isInitialMessageOfChunk) {
          messagesChunk.push(message)
        } else {
          allMessagesContainer.push(messagesChunk)
          messagesChunk = []
          messagesChunk.push(message)
        }
      }

      if (isLastMessage) {
        allMessagesContainer.push(messagesChunk)
      }
    })

    const messageObj = {}
    const messagesContainerWithDate = allMessagesContainer.forEach(messageChunk => {
      const date = moment(messageChunk[0].createdAt).local().format("MMM DD, YYYY")
      if (messageObj[date]) {
        messageObj[date].push(messageChunk)
      } else {
        messageObj[date] = [messageChunk]
      }
    })
    const renderMessages = Object.keys(messageObj).map((time, index) => {
      const messages = messageObj[time]
      const componentsMessages = messages.map(messageChunk => (
        <ItemMessage
          messages={messageChunk}
          showUserInfo={showUserInfo}
        />
      ))

      return (
        <div className={sectionMessagesChunk}>
          <div className={sectionMessagesChunkHeader}>
            <div className={sectionMessagesChunkDate}>
              {time}
            </div>
          </div>
          <div className={sectionMessagesChunkContent}>{componentsMessages}</div>
        </div>
      )
    })

    return (
      <div className={contentUl} ref={(div) => this._dashboardContent = div}>
        {renderMessages}
      </div>
    )
  }

  render() {
    const {
      rightbar,
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allMessages,
      channel,
      messageSearch,
      isOpenRightbar,
    } = this.props
    const { channelId } = this.props.params
    const messages = allMessages
    const { image } = currentUser
    const dashboardWrapperClassNames = isOpenRightbar ? wrapperShrink : wrapper

    let placeholder
    let channelUsers
    let defaultTitle
    if (channel) {
      const { users } = channel
      const { allUsers } = this.props
      const channelUsers = users.map(userId => allUsers.filter(user => user.id === userId)[0])
      const extractChannelOtherUsers = channel && allUsers && channelUsers && usersWithoutCurrentUser(channelUsers, currentUser)
      placeholder = channel && placeholderMessage(extractChannelOtherUsers)
      defaultTitle = channelUsers && `Go for it! This is your very private space with ${extractChannelOtherUsers.map(user => user.firstName).join(', ')}`
    }

    return (
      <div className={dashboardWrapperClassNames} >
        <div className={inner} ref={(div)=> this._dashboard = div}>
          <div className={header}>
            <div className={headerBar}>
              <div className={headerBarChannelInfo}>
                <div className={headerBarChannelInfoDescription}>
                  <span className={fontGroupName}>{channel && channel.name || '🐓💨' }</span>
                  <span className={fontDescription}>{channel && channel.description || defaultTitle}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={content}>
            { messages && this.messages }
          </div>
        </div>
        <div className={sectionInput}>
          <InputPost
            refTo={(input) => this._inputMessage = input}
            imgUrl={image && image.mediumUrl}
            placeholder={placeholder}
            suggestionedUsers={channel ? channelUsers : []}
            onPostSubmit={::this.messageCreate}
            currentPostType={'MESSAGE'}
            channelId={channelId}
            userSearch={userSearch}
            showUserInfo={showUserInfo}
            currentUserId={currentUser.id}
          />
        </div>
      </div>
    )
  }
}

ChannelDashboard.PropTypes = {
  params: '',
  rightbar: '',
  showUserInfo: '',
  suggestionedUsers: '',
  userSearch: '',
  currentUser: '',
  allMessages: '',
  channels: '',
  messageSearch: '',
  messageCreate: '',
}
