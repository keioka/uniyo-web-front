/* @flow */
import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  CardPost,
  CardDocument,
  CardReview,
  CardQuestion,
  InputPost,
  Donnut,
  TextPost,
  ListMessage,
} from '../../../index'

import {
  header,
  headerItemUser,
  headerItemUserImg,
  headerItemUserName,
  headerBar,
  headerBarListUser,
  headerBarChannelInfo,
  headerBarChannelInfoUsersCount,
  headerBarChannelInfoDescription,
  headerItemUserIconOnlineStatus,
  content,
  contentUl,
  sectionQuestion,
  sectionImage,
  sectionContent,
  sectionContentHeader,
  sectionContentFotter,
  textUserName,
  btnLike,
  btnComment,
  sectionCards,
  sectionInput,
} from './style'

export default class ChannelDashboard extends Component {

  static defaultProps = {
  }

  state = {}

  componentDidMount() {
    const { messageSearch, params } = this.props
    const { channelId } = params
    const timeNow = moment.utc(new Date()).format()
    console.log(timeNow)
    // check if channelId is found from current user's channel reducer 'all'.
    messageSearch({
      limit: 50,
      channelId,
      around: timeNow,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.channelId != nextProps.params.channelId) {
      const { messageSearch } = this.props
      const { channelId } = nextProps.params
      messageSearch({
        limit: 50,
        channelId,
      })
    }
    const { allMessages, showUserInfo } = this.props
    // if new message is coming through
    if (allMessages.length !== nextProps.allMessages.length) {
      document.body.scrollTop = document.body.scrollHeight
    }
  }

  get messages() {
    const { allMessages, showUserInfo } = this.props
    const { channelId } = this.props.params


    // All messages on channel
    const messages = allMessages.filter(message => message.channelId == channelId)

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

      if (
        isLastMessage &&
        isSameUser
      ) {
        messagesChunk.push(message)
        allMessagesContainer.push(messagesChunk)
      } else if (
        !isInitialMessageOfChunk &&
        !isSameUser &&
        isLastMessage
      ) {
        allMessagesContainer.push(messagesChunk)
        messagesChunk = []
        messagesChunk.push(message)
        allMessagesContainer.push(messagesChunk)
      } else if (
        !isInitialMessageOfChunk &&
        !isSameUser
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

    return allMessagesContainer.map(messageChunk => {
      return (<ListMessage messages={messageChunk} showUserInfo={showUserInfo} />)
    })
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
