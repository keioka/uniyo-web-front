import React, { Component, PropTypes } from 'react'

import {
  TextPost,
} from '../../'

import {
  boxImage,
  fontName,
  imgUser,
  wrapper,
  spanChannelInfo,
  fontUserNames,
  textUserHashtag,
  rowHashtags,
  boxUserInfo,
  iconOnline,
  iconOffline,
} from './style.scss'


const ItemNewChatUser = ({ user, onClick }) => {
  const { id, image, name, hashtags } = user
  return (
    <li key={id} className={wrapper} onClick={() => onClick(user)}>
      <div className={boxImage}>
        <img src={image.mediumUrl} className={imgUser} />
      </div>
      <div className={boxUserInfo}>
        <span className={fontName}>
          {user.isOnline ? <span className={iconOnline}></span> : <span className={iconOffline}></span>}
          <span className={fontUserNames}>{user.name}</span>
        </span>
        <span className={rowHashtags}>
          {hashtags && hashtags.filter(hashtag => hashtag.hashtag !== '').map(hashtag => <span className={textUserHashtag}>#{hashtag.hashtag}</span>)}
        </span>
      </div>
    </li>
  )
  // TODO: what if long comment
}

export default ItemNewChatUser
