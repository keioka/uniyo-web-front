import React, { Component, PropTypes } from 'react'

import {
  wrapper,
  sectionImage,
  sectionContent,
  sectionContentUserName,
} from './style'

export default ({ text, user, likesCount, commentsCount, currentUserLiked }) => {
  return (
    <div className={wrapper}>
      <div className={sectionImage}>
        <img src={user.image.smallUrl} alt="" />
      </div>
      <div className={sectionContent}>
        <div className={sectionContentUserName}>{user.name}</div>
        <div>{text}</div>
      </div>

    </div>
  )
}
