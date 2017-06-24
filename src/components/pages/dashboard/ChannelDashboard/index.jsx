/* @flow */
import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { decorator } from '../../../../utils'
const { placeholderMessage, usersWithoutCurrentUser } = decorator

import {
  InputPost,
  ListMessage,
} from '../../../index'

import {
  wrapper,
  wrapperShrink,
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

export default class ChannelDashboard extends Component {

  state = {
    isLazyLoading: false,
  }

  componentDidMount() {
    const {
      messageSearch,
      params,
    } = this.props
    const { channelId } = params

    this.markNotificationRead()
    const timeNow = moment.utc(new Date()).format()

    if (this._dashboard) {
      window.addEventListener('scroll', ::this.onScrollHandler)
    }
    // check if channelId is found from current user's channel reducer 'all'.

    // TODO: This is patch
    // The problem is when messageSearch is called it is used old access token
    // Should make flag whether token is refreshed or not and if it true, get messageSearch action fired.
    setTimeout(() => {
      messageSearch({
        limit: 50,
        channelId,
        around: timeNow,
      })
    }, 1000)

    window.scrollTo(14000, 14000)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', ::this.onScrollHandler)
  }

  componentWillReceiveProps(nextProps) {
    this.markNotificationRead()
    if (this.props.params.channelId != nextProps.params.channelId) {
      const { messageSearch } = this.props
      const { channelId } = nextProps.params
      const timeNow = moment.utc(new Date()).format()

      messageSearch({
        limit: 50,
        channelId,
        around: timeNow,
      })
      window.scrollTo(14000, 14000)
    }

    const { allMessages, showUserInfo } = this.props

    // when new message is coming through websocket
    if (allMessages.length !== nextProps.allMessages.length) {
    }
  }

  markNotificationRead() {
    console.log('markNotificationRead')
    const {
      messageSearch,
      params,
      contentReadCheckNotification,
      unReadChannelIds = [],
    } = this.props

    const { channelId } = params
    const ids = unReadChannelIds.filter(idsObject => idsObject.channelId === parseInt(channelId))
    console.log('ids', ids)
    console.log('unReadChannelIds', unReadChannelIds)
    console.log(ids.length > 0)
    if (ids.length > 0) {
      contentReadCheckNotification({ contentType: 'MESSAGE_READ', ids })
    }
  }

  onScrollHandler(event) {
    const dashboard = this._dashboard
    const { allMessages, showUserInfo } = this.props
    const { channelId } = this.props.params

    // All messages on channel
    const messages = allMessages.filter(message => message.channelId == channelId)
    const lastMessageIndex = messages.length - 1
    const lastMessage = messages[lastMessageIndex] || true // <- if there is not post, assign true
    const { scrollHeight } = event.target.body
    const currentHeight = event.target.body.scrollTop + window.screen.availHeight
    //
    // console.log("---------------------------")
    // console.log('body scroll top', event.target.body.scrollTop)
    // console.log(scrollHeight, currentHeight)
    // console.log(scrollHeight < currentHeight)
    // console.log("---------------------------")

    if (
      scrollHeight < currentHeight &&
      !this.state.isLazyLoading &&
      lastMessage // to avoid bug 'lastPost returns undefined' while scrolling
    ) {

      // TODO: fix bug 'this.props.postsSearch action dispatched twice'

      const searchMessage = () => {
        this.props.messageSearch({
          limit: 50,
          channelId,
          after: moment.utc(lastMessage.createdAt).format(),
        })
      }

      this.setState({
        // if it is not loaded, this won't be turned to false.
        // which means engine never call this block.
        isLazyLoading: true,
      }, searchMessage)
    }


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

  get messages() {
    const { allMessages, showUserInfo } = this.props
    const { channelId } = this.props.params
    const messages = allMessages.filter(message => message.channelId == channelId)
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

    return (
      <div>
        {Object.keys(messageObj).map((key, index) => {
          const messages = messageObj[key]
          const componentsMessages = messages.map(messageChunk => (
            <ListMessage
              messages={messageChunk}
              showUserInfo={showUserInfo}
            />
          ))

          return (
            <div className={sectionMessagesChunk}>
              <div className={sectionMessagesChunkHeader}>
                <div className={sectionMessagesChunkDate}>
                  {key}
                </div>
              </div>
              <div className={sectionMessagesChunkContent}>{componentsMessages}</div>
            </div>
          )
        })
       }
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
      allChannels,
      messageSearch,
      messageCreate,
    } = this.props
    const { channelId } = this.props.params
    const channel = allChannels.filter(channel => channel.id == channelId)[0]
    const messages = allMessages.filter(message => message.channelId == channelId)
    const { hashtags: hashtagsCurrentUser, image } = currentUser
    const { isOpen: isRightbarOpen } = rightbar
    const dashboardWrapperClassNames = isRightbarOpen ? wrapperShrink : wrapper

    let placeholder
    let channelUsers
    if (channel) {
      const { users } = channel
      const channelUsers = usersWithoutCurrentUser(users, currentUser)
      placeholder = channel && placeholderMessage(channelUsers)
    }

    return (
      <div className={dashboardWrapperClassNames} ref={(div)=> this._dashboard = div}>
        <div className={header}>
          <div className={headerBar}>
            <div className={headerBarChannelInfo}>
              <div className={headerBarChannelInfoDescription}>
                <span className={fontGroupName}>{channel && channel.name || 'Private Group Name' }</span>
                <span className={fontDescription}>{channel && channel.description || 'Add a short description' }</span>
              </div>
            </div>
          </div>
        </div>
        <div className={content}>
          <div className={contentUl}>
            { messages && this.messages }
          </div>
        </div>
        <div className={sectionInput}>
          <InputPost
            imgUrl={image && image.mediumUrl}
            placeholder={placeholder}
            suggestionedUsers={channel ? channel.users : []}
            onPostSubmit={messageCreate}
            currentPostType={'MESSAGE'}
            channelId={channelId}
            userSearch={userSearch}
            showUserInfo={showUserInfo}
          />
        </div>
      </div>
    )
  }
}
