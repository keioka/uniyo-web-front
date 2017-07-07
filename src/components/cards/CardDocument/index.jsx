import React, { PureComponent, PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import VisibilitySensor from 'react-visibility-sensor'
import { MdKeyboardArrowDown } from 'react-icons/lib/md'

import {
  TextPost,
  Donut,
  ButtonFile,
  ButtonDonut,
  ListComment,
  InputComment,
  PanelDropDownMenu,
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
  iconOpenMenu,
  panelMenu,
  footerSectionBtns,
} from '../style'

export default class CardDocument extends PureComponent {

  state = {
    toggle: false,
  }

  closeCommentBox() {
    this.setState({
      toggle: false
    })
  }

  onClickCommentHandler() {
    const { commentsSearch, commentsCount, id } = this.props
    if (commentsCount > 0) {
      commentsSearch({ postId: id, limit: commentsCount })
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

  get menuItems () {
    const { user, currentUserId, id } = this.props
    const isCurrentUserPost = user.id === currentUserId
    const menu = isCurrentUserPost ? [{
      title: 'Delete',
      action: (event) => { this.props.postDelete({ postId: id }); event.preventDefault(); },
    }, {
      title: 'Share',
      action: () => { alert('share')},
    }] : [{
      title: 'Share',
      action: () => { alert('share')},
    }]

   return menu
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
      comments,
      commentCreate,
      commentGiveDonuts,
      showUserInfo,
      imageCurrentUser,
      currentPostType,
    } = this.props

    let sectionComemntClassNames = sectionContentComment
    if (!this.state.toggle) sectionComemntClassNames += ` ${show}`
    const time = moment.utc(createdAt).format("HH:mm A")
    const onClickKeyboardArrow = () => { this.setState({ isDisplayDropDown: !this.state.isDisplayDropDown }) }
    const onClickUser = () => showUserInfo(user.id)
    const closePanel = () => { this.setState({ isDisplayDropDown: false }) }

    return (
      <VisibilitySensor
        key={id}
        onChange={::this.onChange}
      >
        <div key={id} className={wrapper}>
          <div className={sectionImage} onClick={onClickUser}>
            <img src={user.image.smallUrl} alt="" />
          </div>
          <div className={sectionContent}>
            <div className={sectionContentHeader}>
              <span className={textUserName} onClick={onClickUser}>{user.firstName}</span>
                {/* <span className={textPostTime}>{time}</span> */}
              <span className={iconOpenMenu} onClick={onClickKeyboardArrow}><MdKeyboardArrowDown /></span>
              {this.state.isDisplayDropDown &&
               <PanelDropDownMenu
                 className={panelMenu}
                 items={this.menuItems}
                 isDisplay={this.state.isDisplayDropDown}
                 closePanel={closePanel}
               />}
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
                <button className={btnComment} data-count={commentsCount} onClick={::this.onClickCommentHandler}>
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
                <InputComment
                  postId={id}
                  commentCreate={commentCreate}
                  imageCurrentUser={imageCurrentUser}
                  userPost={user}
                  closeCommentBox={::this.closeCommentBox}
                />
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
