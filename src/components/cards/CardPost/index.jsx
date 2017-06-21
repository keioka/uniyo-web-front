import React, { PureComponent , PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import VisibilitySensor from 'react-visibility-sensor'

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
  sectionContentFooter,
  sectionContentUserName,
  sectionContentComment,
  sectionContentCommentForm,
  sectionContentCommentList,
  textUserName,
  textPostTime,
  btnLike,
  btnComment,
  show,
  footerSectionBtns,
  sectionFileDetail,
} from '../style'

export default class CardPost extends PureComponent  {

  state = {
    toggle: false,
  }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.props.comments) {
  //     return false
  //   }
  //
  //   if (
  //     nextProps.commentsCount !== this.props.commentsCount ||
  //     nextProps.comments.length !== this.props.comments.length ||
  //     nextProps.donutsCount !== this.props.donutsCount ||
  //     nextState.toggle !== this.state.toggle
  //   ) {
  //     return true
  //   }
  //   return false
  // }

  onChange() {
    const { id } = this.props
    // this.props.onReadContent('POST_READ', id)
  }

  onClickComment(event) {
    const { commentsSearch, commentsCount, id } = this.props
    if (commentsCount > 0 && !this.state.toggle) {
      commentsSearch({ postId: id, limit: commentsCount })
    }

    this.setState({
      toggle: !this.state.toggle,
    })
  }

  onClickDonuts(event) {
    const { postGiveDonuts, id } = this.props
    postGiveDonuts({ postId: id, amount: 1 })
  }

  closeCommentBox() {
    this.setState({
      toggle: false
    })
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
      <VisibilitySensor
        onChange={::this.onChange}
        >
          <div key={id} className={wrapper}>
            <div className={sectionImage} onClick={() => showUserInfo(user.id)}>
              <img src={user.image.smallUrl} alt="" />
            </div>
            <div className={sectionContent}>
              <div className={sectionContentHeader}>
                <span className={textUserName} onClick={() => showUserInfo(user.id)}>{user.firstName}</span>
                {/* <span className={textPostTime}>{time}</span> */}
              </div>
              <TextPost
                text={text}
                showUserInfo={showUserInfo}
                currentPostType={currentPostType}
              />
              <div className={sectionContentFooter}>
                <div className={sectionFileDetail}>
                </div>
                <div className={footerSectionBtns}>
                  <button
                    className={btnComment}
                    data-count={commentsCount}
                    onClick={::this.onClickComment}
                    >
                      comments
                    </button>
                    <ButtonDonut
                      className={btnLike}
                      donutsCount={donutsCount}
                      onClick={::this.onClickDonuts}
                      donutsThrow={donutsThrow}
                    />
                  </div>
                </div>
                { this.state.toggle &&
                  <div className={sectionContentComment}>
                    <div className={sectionContentCommentForm}>
                      <InputComment
                        postId={id}
                        commentCreate={commentCreate}
                        currentUser={currentUser}
                        userPost={user}
                        closeCommentBox={::this.closeCommentBox}
                      />
                    </div>
                    <ul className={sectionContentCommentList}>
                      {comments && comments.map(comment =>
                        <ListComment
                          key={comment.id}
                          showUserInfo={showUserInfo}
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
            </VisibilitySensor>
          )
        }
      }
