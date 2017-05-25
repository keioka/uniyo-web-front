/* @flow */
import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  InputPost,
  ListMessage,
} from '../../../index'

import {
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
} from './style'

export default class ChannelDashboard extends Component {

  static defaultProps = {
  }

  state = {
    isLazyLoading: false,
  }

  componentDidMount() {
    const { messageSearch, params } = this.props
    const { channelId } = params
    const timeNow = moment.utc(new Date()).format()
    window.addEventListener('scroll', ::this.onScrollHandler)
    // check if channelId is found from current user's channel reducer 'all'.
    messageSearch({
      limit: 50,
      channelId,
      around: timeNow,
    })
    document.body.scrollTop = document.body.scrollHeight
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.channelId != nextProps.params.channelId) {
      const { messageSearch } = this.props
      const { channelId } = nextProps.params
      const timeNow = moment.utc(new Date()).format()

      messageSearch({
        limit: 50,
        channelId,
        around: timeNow,
      })
    }
    const { allMessages, showUserInfo } = this.props
    // if new message is coming through
    if (allMessages.length !== nextProps.allMessages.length) {
      document.body.scrollTop = document.body.scrollHeight
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

    // All messages on channel
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
      if (
        isLastMessage &&
        isSameUser
      ) {
        messagesChunk.push(message)
        allMessagesContainer.push(messagesChunk)
      } else if (
        !isInitialMessageOfChunk &&
        isLastMessage &&
        (!isSameUser || isTimeOverFiveMinutes)
      ) {
        allMessagesContainer.push(messagesChunk)
        messagesChunk = []
        messagesChunk.push(message)
        allMessagesContainer.push(messagesChunk)
      } else if (
        !isInitialMessageOfChunk &&
        (!isSameUser || isTimeOverFiveMinutes)
      ) {
        allMessagesContainer.push(messagesChunk)
        messagesChunk = []
        messagesChunk.push(message)
      } else if (
         isInitialMessageOfChunk ||
         isSameUser
      ) {
         messagesChunk.push(message)
      } else {
        allMessagesContainer.push(messagesChunk)
        messagesChunk = []
        messagesChunk.push(message)
      }
    })

    const messageObj = {}
    const messagesContainerWithDate = allMessagesContainer.forEach(messageChunk => {
      const date = moment(messageChunk[0].createdAt).format("MMM DD, YYYY")
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
              <div>{componentsMessages}</div>
            </div>
          )
        })
       }

      </div>
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
      messageSearch,
      messageCreate,
    } = this.props

    const { channelId } = this.props.params
    const channel = allChannels.filter(channel => channel.id == channelId)[0]
    const messages = allMessages.filter(message => message.channelId == channelId)
    const { hashtags: hashtagsCurrentUser, image } = currentUser
    return (
      <div ref={(div)=> this._dashboard = div}>
        <div className={header}>
          <div className={headerBar}>
            <div className={headerBarChannelInfo}>
              <div className={headerBarChannelInfoUsersCount}>{channel && channel.users.length}</div>
              <div className={headerBarChannelInfoDescription}>
                <span>Title</span>
                <span>description</span>
              </div>
            </div>
          </div>
        </div>
        <div className={content}>
          <ul className={contentUl}>
            { messages && this.messages }
          </ul>
        </div>
        <div className={sectionInput}>
          <InputPost
            imgUrl={image && image.mediumUrl}
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
