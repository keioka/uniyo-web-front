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
  sectionContentCommentForm,
  sectionContentCommentList,
  textUserName,
  textPostTime,
  btnLike,
  btnComment,
  show,
} from '../style'

export default class CardPost extends Component {

  constructor() {
    super()
    this.state = {
      toggle: false,
    }
  }

  onClickCommentHandler(event) {
    event.preventDefault()
    event.stopPropagation()
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
      likesCount,
      commentsCount,
      currentUserLiked,
      createdAt,
      commentsSearch,
      commentCreate,
      comments,
      showUserInfo,
      currentUser,
      postGiveDonuts,
      userGiveDonuts,
      commentGiveDonuts,
    } = this.props

    let sectionComemntClassNames = sectionContentComment
    if (!this.state.toggle) sectionComemntClassNames += ` ${show}`
    const time = moment.utc(createdAt).format("HH:mm A")

    return (
      <div key={id} className={wrapper}>
        <div className={sectionImage}>
          <img src={user.image.smallUrl} alt="" />
        </div>
        <div className={sectionContent}>
          <div className={sectionContentHeader}>
            <span className={textUserName}>{user.name}</span>
            {/* <span className={textPostTime}>{time}</span> */}
          </div>
          <TextPost text={text} showUserInfo={showUserInfo} />
          <div className={sectionContentFotter}>
            <button
              className={btnLike}
              data-count={commentsCount}
              onClick={::this.onClickCommentHandler}>
                comments
            </button>
            <button
              className={btnComment}
              data-role='give-donuts'
              data-count={likesCount}
              onClick={::this.onClickDonutsHandler}
            >
              <Donnut size="xs" />
            </button>
          </div>
          { this.state.toggle &&
            <div className={sectionContentComment}>
              <div className={sectionContentCommentForm}>
                <InputComment postId={id} commentCreate={commentCreate} currentUser={currentUser} />
              </div>
              <ul className={sectionContentCommentList}>
                {comments && comments.map(comment =>
                  <ListComment
                    key={comment.id}
                    commentGiveDonuts={commentGiveDonuts}
                    {...comment}
                  >
                    {comment.text}
                  </ListComment>
                )}
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}
