import React, { PureComponent, PropTypes } from 'react'
import moment from 'moment'
import VisibilitySensor from 'react-visibility-sensor'

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
  sectionContentFooter,
  sectionContentUserName,
  sectionContentComment,
  sectionContentCommentList,
  textUserName,
  textPostTime,
  footerSectionBtns,
  sectionFileDetail,
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

  onChange() {

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
    const { postGiveDonuts, id } = this.props
    postGiveDonuts({ postId: id, amount: 1 })
  }

  render() {
    const {
      id,
      text,
      user,
      donutsCount,
      donutsThrow,
      commentsCount,
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
          <div className={sectionContentFooter}>
            <div className={sectionFileDetail}>
            </div>
            <div className={footerSectionBtns}>
              <button className={btnComment} data-count={commentsCount} onClick={(event) => ::this.onClickCommentHandler(event)}>comments</button>
              <ButtonDonut
                className={btnLike}
                donutsCount={donutsCount}
                donutsThrow={donutsThrow}
                onClick={::this.onClickDonutsHandler}
              />
            </div>
          </div>
          { this.state.toggle &&
            <div className={sectionContentComment}>
              <InputComment postId={id} commentCreate={commentCreate} currentUser={currentUser} userPost={user} />
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
