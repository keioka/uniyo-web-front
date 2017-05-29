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
} from './style'

const ListComment = ({ id, user, text, commentGiveDonuts, donutsCount }) => {
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage}>
        <img src={user.image.smallUrl} className={imgUser} />
      </span>
      <span className={fontName}>{user.firstName}</span>
      <span className={content}>
        <TextPost text={text} />
        <ButtonDonut
          donutsCount={donutsCount}
          onClick={(event) => {   event.stopPropagation(); commentGiveDonuts({ commentId: id, amount: 1 })} }
        />
      </span>
    </li>
  )
  // TODO: what if long comment
}

export default ListComment
