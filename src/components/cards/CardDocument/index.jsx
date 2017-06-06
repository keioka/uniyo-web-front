import React, { PureComponent, PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import VisibilitySensor from 'react-visibility-sensor'

import {
  TextPost,
  Donut,
  ButtonFile,
  ButtonDonut,
  ListComment,
  InputComment,
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
  sectionContentCommentList,
  sectionFileDetail,
  file,
  textUserName,
  textPostTime,
  btnLike,
  btnComment,
  show,
  footerSectionBtns,
} from '../style'

export default class CardDocument extends PureComponent {

  state = {
    toggle: false,
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

  onChange() {
    const { id } = this.props
    this.props.onReadContent('POST_READ', id)
  }

  onClickDonutsHandler() {
    const { postGiveDonuts, id } = this.props
    postGiveDonuts({ postId: id, amount: 1 })
  }

  render() {
    const {
      id,
      text,
      user,
      commentsCount,
      donutsCount,
      donutsThrow,
      currentUserLiked,
      createdAt,
      fileName,
      fileSize,
      contentType,
      allComments,
      commentsSearch,
      comments,
      commentCreate,
      showUserInfo,
      currentUser,
      currentPostType,
    } = this.props

    let sectionComemntClassNames = sectionContentComment
    if (!this.state.toggle) sectionComemntClassNames += ` ${show}`
    const time = moment.utc(createdAt).format("HH:mm A")


    return (
      <VisibilitySensor
        onChange={::this.onChange}
      >
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
            <div className={sectionContentFooter}>
              <div className={sectionFileDetail}>
                <ButtonFile {...this.props} />
              </div>
              <div className={footerSectionBtns}>
                <button className={btnComment} data-count={commentsCount} onClick={() => ::this.onClickCommentHandler()}>
                  comments
                </button>
                <ButtonDonut
                  className={btnLike}
                  donutsThrow={donutsThrow}
                  donutsCount={donutsCount}
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
      </VisibilitySensor>
    )
  }
}
