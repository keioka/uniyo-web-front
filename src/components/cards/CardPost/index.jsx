import React, { PureComponent , PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'

import {
  TextPost,
  Donut,
  ListComment,
  InputComment,
  ButtonDonut,
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

export default class CardPost extends PureComponent  {

  constructor() {
    super()
    this.state = {
      toggle: false,
    }
  }

  onClickCommentHandler(event) {
    const { commentsSearch, commentsCount, id } = this.props
    if (commentsCount > 0 && !this.state.toggle) {
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
      donutsCount,
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
      currentPostType,
      donutsThrow,
    } = this.props

    let sectionComemntClassNames = sectionContentComment
    if (!this.state.toggle) sectionComemntClassNames += ` ${show}`
    const time = moment.utc(createdAt).format("HH:mm A")

    return (
      <div key={id} className={wrapper}>
        <div className={sectionImage} onClick={() => showUserInfo(user.id)}>
          <img src={user.image.smallUrl} alt="" />
        </div>
        <div className={sectionContent}>
          <div className={sectionContentHeader}>
            <span className={textUserName} onClick={() => showUserInfo(user.id)}>{user.name}</span>
            {/* <span className={textPostTime}>{time}</span> */}
          </div>
          <TextPost
            text={text}
            showUserInfo={showUserInfo}
            currentPostType={currentPostType}
          />
          <div className={sectionContentFotter}>
            <button
              className={btnComment}
              data-count={commentsCount}
              onClick={::this.onClickCommentHandler}
            >
                comments
            </button>
            <ButtonDonut
              className={btnLike}
              donutsCount={donutsCount}
              onClick={::this.onClickDonutsHandler}
              donutsThrow={donutsThrow}
            />
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
