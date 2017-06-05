import React, { PureComponent , PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import VisibilitySensor from 'react-visibility-sensor'

import {
  TextPost,
  Donut,
  ListComment,
  ButtonDonut,
  InputComment,
} from '../../'

import {
  wrapper,
  wrapperLink,
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
} from '../style'

export default class CardQuestion extends PureComponent {

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
      answersCount,
      currentUserLiked,
      createdAt,
      allComments,
      commentsSearch,
      comments,
      commentCreate,
      showUserInfo,
      currentUser,
      currentPostType,
    } = this.props

    const time = moment.utc(createdAt).format("HH:mm A")

    return (
      <Link to={`/dashboard/questions/${id}`} className={wrapperLink}>
        <div key={id} className={wrapper}>
          <div className={sectionImage}>
            <img src={user.image.smallUrl} alt="" />
          </div>
          <div className={sectionContent}>
            <div className={sectionContentHeader}>
              <span className={textUserName}>{user.name}</span>
              {/* <span className={textPostTime}>{time}</span> */}
            </div>
            <TextPost
              text={text}
              showUserInfo={showUserInfo}
              currentPostType={currentPostType}
            />
            <div className={sectionContentFotter}>
              <button className={btnComment} data-count={answersCount} onClick={(event) => ::this.onClickCommentHandler(event)}>Answer</button>
              <ButtonDonut
                className={btnLike}
                donutsCount={donutsCount}
                donutsThrow={donutsThrow}
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
      </Link>
    )
  }
}
