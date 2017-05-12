import React, { Component, PropTypes } from 'react'

import {
  TextPost,
} from '../../'

import {
  boxImage,
  fontName,
  imgUser,
  wrapper,
} from './style'

const ListComment = ({ id, user, text }) => {
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={user.image.smallUrl} className={imgUser} />
      </span>
      <span className={fontName}>{user.firstName}</span>
      <TextPost text={text} />
    </li>
  )
  // TODO: what if long comment
}

export default ListComment
