import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'

import {
  TextPost,
  Donnut,
  ListComment,
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

export default class CardQuestion extends Component {

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
      likesCount,
      commentsCount,
      currentUserLiked,
      createdAt,
      allComments,
      commentsSearch,
      comments,
      commentCreate,
      showUserInfo,
      currentUser,
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
            <TextPost text={text} showUserInfo={showUserInfo}/>
            <div className={sectionContentFotter}>
              <button className={btnLike} data-count={commentsCount} onClick={() => ::this.onClickCommentHandler()}>Comments</button>
              <button className={btnComment} data-count={likesCount}><Donnut size="xs"/></button>
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
