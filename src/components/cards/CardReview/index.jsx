import React, { PureComponent, PropTypes } from 'react'
import moment from 'moment'
import VisibilitySensor from 'react-visibility-sensor'
import { MdKeyboardArrowDown } from 'react-icons/lib/md'

import {
  TextPost,
  Donut,
  ButtonDonut,
  ListComment,
  InputComment,
  PanelDropDownMenu,
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
  panelMenu,
  iconOpenMenu,
} from '../style'

import Star from './star.svg'

export default class CardReview extends PureComponent {

  state = {
    toggle: false,
    isDisplayDropDown: false,
  }

  onChange() {
    const { id } = this.props
    this.props.onReadContent('POST_READ', id)
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

  onClickDonutsHandler(event) {
    const { postGiveDonuts, id } = this.props
    postGiveDonuts({ postId: id, amount: 1 })
  }

  get menuItems () {
    const { id, user, currentUserId } = this.props
    const isCurrentUserPost = user.id === currentUserId
    const menu = isCurrentUserPost ? [{
      title: 'Delete',
      action: () => { this.props.postDelete({ postId: id }) },
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
      donutsCount,
      donutsThrow,
      commentsCount,
      createdAt,
      showUserInfo,
      commentsSearch,
      comments,
      commentCreate,
      commentDelete,
      commentGiveDonuts,
      rating,
      imageCurrentUser,
      currentUserId,
      currentPostType,
    } = this.props

    const time = moment.utc(createdAt).format("HH:mm A")
    const onClickKeyboardArrow = () => { this.setState({ isDisplayDropDown: !this.state.isDisplayDropDown }) }
    const onClickUser = () => showUserInfo(user.id)
    const closePanel = () => { this.setState({ isDisplayDropDown: false }) }

    return (
    <VisibilitySensor
      onChange={::this.onChange}
      key={id}
    >
      <div key={id} className={wrapper}>
        <div className={sectionImage} onClick={onClickUser}>
          <img src={user.image.smallUrl} alt="" />
        </div>
        <div className={sectionContent}>
          <div className={sectionContentHeader}>
            <div>
              <span className={textUserName} onClick={onClickUser}>{user.firstName}</span>
              {/* <span className={textPostTime}>{time}</span> */}
              <span className={starReview} data-reviews={rating}><Star className={iconStar}/></span>
            </div>
            <span className={iconOpenMenu} onClick={() => { this.setState({ isDisplayDropDown: !this.state.isDisplayDropDown }) }}><MdKeyboardArrowDown /></span>
            { this.state.isDisplayDropDown &&
              <PanelDropDownMenu
                className={panelMenu}
                items={this.menuItems}
                isDisplay={this.state.isDisplayDropDown}
                closePanel={closePanel}
              /> }
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
              <InputComment
                postId={id}
                showUserInfo={showUserInfo}
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
                    commentDelete={commentDelete}
                    commentGiveDonuts={commentGiveDonuts}
                    isOwnComment={comment.user.id === currentUserId}
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
