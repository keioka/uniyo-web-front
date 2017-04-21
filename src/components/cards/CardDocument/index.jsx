import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  TextPost,
  Donnut,
  ButtonFile,
  ListComment,
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
  sectionFileDetail,
  file,
  textUserName,
  textPostTime,
  btnLike,
  btnComment,
  show,
} from '../style'

export default class CardDocument extends Component {

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
      fileName,
      fileSize,
      contentType,
      allComments,
      commentsSearch,
      comments,
      commentCreate,
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
            <span className={textPostTime}>{time}</span>
          </div>
          <TextPost text={text} />
          <div className={sectionFileDetail}><ButtonFile fileName={fileName} fileSize={fileSize} contentType={contentType} /></div>
          <div className={sectionContentFotter}>
            <button className={btnLike} data-count={commentsCount} onClick={() => ::this.onClickCommentHandler()}>comments</button>
            <button className={btnComment} data-count={likesCount}><Donnut size="xs"/></button>
          </div>
          { this.state.toggle &&
            <div className={sectionContentComment}>
              <input type="text" onKeyDown={onKeyDownHandler} />
              <ul className={sectionContentCommentList}>
                {comments && comments.map(comment => <ListComment comment={comment}>{comment.text}</ListComment>)}
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}
