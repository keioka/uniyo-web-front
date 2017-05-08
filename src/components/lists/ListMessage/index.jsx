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

const ListMessage = ({ id, user, text }) => {
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={user.image.smallUrl} className={imgUser} />
      </span>
      <span className={fontName}>{user.firstName}</span>
      <p><TextPost text={text} /></p>
    </li>
  )
  // TODO: what if long comment
}

export default ListMessage
