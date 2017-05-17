import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  TextPost,
  Donnut,
  ListComment,
  InputComment,
} from '../../'

import {
  wrapper,
  sectionImage,
  sectionContent,
  sectionContentHeader,
  sectionContentFotter,
  sectionContentUserName,
  sectionContentComment,
  sectionContentCommentList,
  textUserName,
  textPostTime,
  btnLike,
  btnComment,
  show,
  starReview,
  iconStar,
} from '../style'

import Star from './star.svg'

export default class CardReview extends Component {

  constructor() {
    super()
    this.state = {
      toggle: false,
    }
  }

  onClickCommentHandler() {
    const { commentsSearch, commentsCount, id } = this.props
    if (commentsCount > 0) {
      commentsSearch({ postId: id })
    }

    this.setState({
      toggle: !this.state.toggle,
    })
  }

  render() {
    const {
      id,
      text,
      user,
      donutsCount,
      commentsCount,
      currentUserLiked,
      createdAt,
      showUserInfo,
      commentsSearch,
      comments,
      commentCreate,
      rating,
      currentUser,
    } = this.props

    const time = moment.utc(createdAt).format("HH:mm A")

    return (
      <div className={wrapper}>
        <div className={sectionImage}>
          <img src={user.image.smallUrl} alt="" />
        </div>
        <div className={sectionContent}>
          <div className={sectionContentHeader}>
            <span className={textUserName}>{user.name}</span>
            {/* <span className={textPostTime}>{time}</span> */}
            <span className={starReview} data-reviews={rating}><Star className={iconStar}/></span>
          </div>
          <TextPost text={text} showUserInfo={showUserInfo} />
          <div className={sectionContentFotter}>
            <button className={btnLike} data-count={commentsCount} onClick={(event) => ::this.onClickCommentHandler(event)}>comments</button>
            <button className={btnComment} data-role='give-donuts' data-count={donutsCount}><Donnut size="xs"/></button>
          </div>
          { this.state.toggle &&
            <div className={sectionContentComment}>
              <InputComment postId={id} commentCreate={commentCreate} currentUser={currentUser} />
              <ul className={sectionContentCommentList}>
                {comments && comments.map(comment => <ListComment key={comment.id} {...comment}>{comment.text}</ListComment>)}
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}
