/* @flow */
import React, { Component, PropTypes } from 'react'

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
  sectionQuestion,
  sectionImage,
  sectionContent,
  sectionContentHeader,
  sectionContentFotter,
  textUserName,
  btnLike,
  btnComment,
  sectionCards,
} from './style'

export default class ChannelDashboard extends Component {

  static defaultProps = {
  }

  state = {}

  componentDidMount() {
    const { messageSearch, params } = this.props
    const { channelId } = params
    // check if channelId is found from current user's channel reducer 'all'.
    messageSearch({
      limit: 50,
      channelId,
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
  }

  render() {
    const {
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allMessages,
      messageSearch,
      messageCreate,
    } = this.props

    const { channelId } = this.props.params
    const messages = allMessages.filter(message => message.channelId == channelId)
    const { hashtags: hashtagsCurrentUser, image } = currentUser

    return (
      <div ref={(div)=> this._dashboard = div}>
        {messages && messages.map(message => <ListMessage {...message} />)}
        <InputPost
          imgUrl={image && image.mediumUrl}
          suggestionedUsers={suggestionedUsers}
          onPostSubmit={messageCreate}
          currentPostType={'MESSAGE'}
          channelId={channelId}
          userSearch={userSearch}
          showUserInfo={showUserInfo}
        />
      </div>
    )
  }
}
