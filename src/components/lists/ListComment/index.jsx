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
  const { name, firstName, image } = user
  const onClickButtonDonut = () => commentGiveDonuts({ commentId: id, amount: 1 })
  const onClickUserInfo = () => showUserInfo(user.id)
  return (
    <li key={id} className={wrapper}>
      <span className={boxImage} onClick={onClickUserInfo}>
        <img src={image.smallUrl} className={imgUser} alt={name} />
      </span>
      <span className={content}>
        <span className={contentText}>
          <span className={fontName} onClick={onClickUserInfo}>{firstName}</span>
          <TextPost text={text} />
        </span>
        <ButtonDonut
          donutsCount={donutsCount}
          onClick={onClickButtonDonut}
        />
      </span>
    </li>
  )
  // TODO: what if long comment
}

ListComment.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  commentGiveDonuts: PropTypes.func.isRequired,
  donutsCount: PropTypes.number.isRequired,
  showUserInfo: PropTypes.func.isRequired,
}

export default ListComment
