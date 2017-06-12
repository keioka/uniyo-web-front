import React, { Component, PropTypes } from 'react'

import {
  TextPost,
  ButtonDonut,
} from '../../'

import {
  boxImage,
  fontName,
  imgUser,
  wrapper,
  content,
  contentText,
} from './style'

const ListComment = ({ id, user, text, commentGiveDonuts, donutsCount, showUserInfo }) => {
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage} onClick={(event) => { showUserInfo(user.id) }}>
        <img src={user.image.smallUrl} className={imgUser} />
      </span>
      <span className={content}>
        <span className={contentText}>
          <span className={fontName} onClick={(event) => { showUserInfo(user.id) }}>{user.firstName}</span>
          <TextPost text={text} />
        </span>
        <ButtonDonut
          donutsCount={donutsCount}
          onClick={(event) => { event.stopPropagation(); commentGiveDonuts({ commentId: id, amount: 1 })} }
        />
      </span>
    </li>
  )
  // TODO: what if long comment
}

export default ListComment
