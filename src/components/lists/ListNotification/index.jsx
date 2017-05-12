import React, { Component, PropTypes } from 'react'
import VisibilitySensor from 'react-visibility-sensor';
import {
  wrapper,
  boxImg,
  imgUser,
  unread,
  read
} from './style'

const ListNotification = ({ notification, notificationReadMark, onVisiable }) => {
  const { id, type, isRead } = notification
  const user = 'kei'

  const commentNotification = `@${user} commented on your post`
  const hashtagNotification = `#${user} commented on your post`
  const messageNotification = `${2} new messages in your private chat with @Emmanuel and 4 others`

  let component
  let userImageUrl

  const onChange = function (isVisible) {
    if (isVisible && !isRead) {
      onVisiable({ notificationId: id })
    }
  }

  switch (type) {
    case 'POST_MENTION': {
      const { post } = notification
      const { user } = post
      component = (<span><span>@{user.firstName}</span> mentioned you on his post</span>)
      userImageUrl = user.image.smallUrl
      break
    }

    case 'POST_HASHTAG': {
      component = (<span><span>@{user.firstName}</span> mentioned you on his post</span>)
      break
    }

    case 'NEW_CHANNEL_MESSAGE': {
      const user = notification.channel.users[1]
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
        <span className={boxImg}><img src={userImageUrl} className={imgUser} alt="" /></span><span>{component}</span>
      </li>
    </VisibilitySensor>
  )
  // TODO: what if long comment
}

export default ListNotification
