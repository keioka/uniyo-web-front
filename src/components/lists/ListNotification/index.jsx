import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import moment from 'moment'
import VisibilitySensor from 'react-visibility-sensor'

import {
  wrapper,
  box,
  boxImg,
  time,
  imgUser,
  unread,
  read,
  textUserName,
  textHashtag,
} from './style'

import { postValue, decorator } from '../../../utils'
const { extractHashtagFromText } = postValue
const { usersWithoutCurrentUser } = decorator

const generateMesssagHashtag = (type) => {
  switch (type) {
    case 'POST': {
      return 'made a new publication'
    }
    case 'REVIEW': {
      return 'asked a question '
    }
    case 'QUESTION': {
      return 'made a new review'
    }
    case 'CLASS_NOTE': {
      return 'uploaded a new document'
    }
  }
}

const postTypes = {
  'POST': 'publication',
  'REVIEW': 'review',
  'QUESTION': 'question',
  'CLASS_NOTE': 'document',
  'ANSWER': 'answer',
}

const ListNotification = ({
  notification,
  notificationReadMark,
  onVisiable,
  notificationSearch,
  isLastNotification,
  currentUser,
  showHistoryDonut,
  showUserInfo,
  post: postObject,
}) => {

  const { id, type, isRead, createdAt } = notification

  let component
  let userImageUrl

  const onChange = function (isVisible) {
    if (isVisible && !isRead) {

    }
  }

  const onClick = () => {
    onVisiable({ notificationId: id })
    switch(type) {
      case 'POST_MENTION': {
        const { post } = notification
        browserHistory.push(`/dashboard/posts/${post.id}`)
        break
      }
      case 'POST_HASHTAG': {
        const { post } = notification
        browserHistory.push(`/dashboard/posts/${post.id}`)
        break
      }
      case 'NEW_COMMENT': {
        const { comment, post } = notification
        const postType = post.type
        const { postId, user } = comment
        const path = postType === 'ANSWER' ? 'questions' : 'posts'
        if (postType === 'ANSWER') {
          browserHistory.push(`/dashboard/questions/${postObject.questionId}`)
        } else {
          browserHistory.push(`/dashboard/posts/${post.id}`)
        }
        break
      }
      case 'NEW_CHANNEL_MESSAGE': {
        const { channel } = notification
        browserHistory.push(`/dashboard/channels/${channel.id}`)
        break
      }

      case 'NEW_ANSWER': {
        const { post } = notification
        browserHistory.push(`/dashboard/questions/${post.id}`)
        break
      }

      case 'WEEKLY_RECEIVED_DONUTS_COUNT': {
        showHistoryDonut(1)
        break
      }
    }
  }

  switch (type) {
    case 'POST_MENTION': {
      const { post } = notification
      const { type, user } = post
      const postType = postTypes[type]
      component = (
        <span>
          <span className={textUserName} onClick={(event) => { event.preventDefault(); event.stopPropagation(); showUserInfo(user.id)}}>@{user.firstName}</span> mentioned you in {postType}
        </span>
      )
      userImageUrl = user.image.smallUrl
      break
    }

    case 'POST_HASHTAG': {
      const { post } = notification
      const { type, user } = post
      userImageUrl = user ? user.image.smallUrl : ''
      const postType = postTypes[type]
      const hashtags = extractHashtagFromText(post.text)
      component = (
        <span>
          <span className={textUserName} onClick={(event) => { event.preventDefault(); event.stopPropagation(); showUserInfo(user.id)}}>
            @{user.firstName} &nbsp;
          </span>
          {generateMesssagHashtag(type)} about &nbsp;
          <span>{hashtags.map(hashtag =>
            <span className={textHashtag} onClick={(event) => { event.preventDefault(); event.stopPropagation(); browserHistory.push(`/dashboard?hashtag=${hashtag.replace(/#/, '')}`)}}>{hashtag} &nbsp;</span>
          )}</span>
        </span>)
      break
    }

    case 'NEW_ANSWER': {
      const { post, answer } = notification
      const { user } = answer
      userImageUrl = user.image.smallUrl
      component = (
        <span>
          <span className={textUserName} onClick={(event) => { event.preventDefault(); event.stopPropagation(); showUserInfo(user.id)}}>
            @{user.firstName} &nbsp;
          </span>
           answered your question
        </span>
      )
      break
    }

    case 'NEW_COMMENT': {
      const { comment, post } = notification
      const { postId, user } = comment
      const { type } = post
      const postType = postTypes[type]
      userImageUrl = user ? user.image.smallUrl : ''
      component = (<span><span className={textUserName} onClick={(event) => { event.preventDefault(); event.stopPropagation(); showUserInfo(user.id)}}>@{user.firstName}</span> commented on your {postType}</span>)
      break
    }

    case 'NEW_CHANNEL_MESSAGE': {
      // const user = usersWithoutCurrentUser(notification.channel.users, currentUser)[0]
      const { user }  = notification.channelMessage
      userImageUrl = user ? user.image.smallUrl : ''
      component = (<span><span className={textUserName} onClick={(event) => { event.preventDefault(); event.stopPropagation(); showUserInfo(user.id)}}>@{user.firstName}</span> sent a new message</span>)
      break
    }

    case 'WEEKLY_RECEIVED_DONUTS_COUNT': {
      const { donutsCount } = notification
      userImageUrl = currentUser.image.mediumUrl
      component = (<span>You received {donutsCount} donuts last week!</span>)
      break
    }

  }

  const classNames = [wrapper]
  if (!isRead) {
    classNames.push(unread)
  } else {
    classNames.push(read)
  }

  return (
    <VisibilitySensor
      onChange={onChange}
    >
      <li key={id} className={classNames.join(' ')} onClick={() => onClick()}>
        <span className={box}>
          <span className={boxImg}>
            <img src={userImageUrl} className={imgUser} alt="" />
          </span>
          <span className={box}>
            {component}
          </span>
        </span>
        <span className={time}>
          {moment.utc(createdAt).local().format("HH:mm A")}
        </span>
      </li>
    </VisibilitySensor>
  )
}

export default ListNotification
