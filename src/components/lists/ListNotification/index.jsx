import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
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
} from './style'

const ListNotification = ({
  notification,
  notificationReadMark,
  onVisiable,
  notificationSearch,
  isLastNotification,
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
      }
      case 'POST_HASHTAG': {
        const { post } = notification
        browserHistory.push(`/dashboard/posts/${post.id}`)
      }
      case 'NEW_COMMENT': {
        const { comment } = notification
        const { postId, user } = comment
        browserHistory.push(`/dashboard/posts/${postId}`)
      }
      case 'NEW_CHANNEL_MESSAGE': {
        const { channel } = notification
        browserHistory.push(`/dashboard/channels/${channel.id}`)
      }
    }
  }

  switch (type) {
    case 'POST_MENTION': {
      const { post } = notification
      const { user } = post
      component = (
        <span>
          <span>
            @{user.firstName} mentioned you on the post
          </span>
        </span>
      )
      userImageUrl = user.image.smallUrl
      break
    }

    case 'POST_HASHTAG': {
      const { post } = notification
      const { user } = post
      userImageUrl = user ? user.image.smallUrl : ''
      component = (<span><span>@{user.firstName}</span> posted new one</span>)
      break
    }

    case 'NEW_COMMENT': {
      const { comment } = notification
      const { postId, user } = comment
      userImageUrl = user ? user.image.smallUrl : ''
      component = (<span><span>@{user.firstName}</span> commented on your post</span>)
      break
    }

    case 'NEW_CHANNEL_MESSAGE': {
      const user = notification.channel.users[0]
      userImageUrl = user ? user.image.smallUrl : ''
      component = (<span>new messages in your private chat with <span>@{user.firstName}</span></span>)
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
