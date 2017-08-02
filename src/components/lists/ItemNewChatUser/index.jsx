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
} from './style'


const ItemNewChatUser = ({ user, onClick }) => {
  const { id, image, name, hashtags } = user
  return (
    <li key={id} className={wrapper} onClick={() => onClick(user)}>
      <div className={boxImage}>
        <img src={image.smallUrl} className={imgUser} />
      </div>
      <div className={boxUserInfo}>
        <span className={fontName}>
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
