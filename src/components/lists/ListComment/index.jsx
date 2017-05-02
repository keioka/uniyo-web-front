import React, { Component, PropTypes } from 'react'

import {
  boxImage,
  fontName,
  imgUser,
  wrapper,
} from './style'

const ListComment = ({ id, user, text }) => {
  console.log(user)
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={user.image.smallUrl} className={imgUser} />
      </span>
      <span className={fontName}>{user.firstName}</span>
      <span>{text}</span>
    </li>
  )
  // TODO: what if long comment
}

export default ListComment
