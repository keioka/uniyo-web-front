import React, { PureComponent, PropTypes } from 'react'
import moment from 'moment'

import {
  TextPost,
  Donut,
  ButtonDonut,
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

export default class CardReview extends PureComponent {

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

  onClickDonutsHandler(event) {
    event.stopPropagation()
    const { postGiveDonuts, id } = this.props
    postGiveDonuts({ postId: id, amount: 1 })
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
      currentPostType,
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
            <button className={btnComment} data-count={commentsCount} onClick={(event) => ::this.onClickCommentHandler(event)}>comments</button>
            <ButtonDonut
              className={btnLike}
              donutsCount={donutsCount}
              onClick={::this.onClickDonutsHandler}
            />
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
