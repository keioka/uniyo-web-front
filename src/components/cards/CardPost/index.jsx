import React, { PureComponent , PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import VisibilitySensor from 'react-visibility-sensor'
import { MdKeyboardArrowDown } from 'react-icons/lib/md'
import { MdContentCopy } from 'react-icons/lib/md'
import { MdDeleteForever } from 'react-icons/lib/md'
import { inputHandler } from '../../../utils'
const { copyToClipboard } = inputHandler

import {
  TextPost,
  Donut,
  ItemComment,
  InputComment,
  ButtonDonut,
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
  sectionContentCommentOpen,
  sectionContentCommentClose,
  sectionContentCommentForm,
  sectionContentCommentList,
  textUserName,
  textPostTime,
  btnLike,
  btnComment,
  show,
  footerSectionBtns,
  sectionFileDetail,
  iconOpenMenu,
  panelMenu,
  imgGif,
} from '../style.scss'

export default class CardPost extends PureComponent  {

  state = {
    toggle: false,
    isDisplayDropDown: false,
  }

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
  componentWillMount() {
    if (this.props.openComment) {
      this.setState({
        toggle: true,
      })
    }
  }

  onChange() {
    const { id } = this.props
    this.props.onReadContent('POST_READ', id)
  }

  onClickComment(event) {
    const { commentsSearch, commentsCount, id } = this.props
    if (commentsCount > 0 && !this.state.toggle) {
      commentsSearch({ postId: id, limit: commentsCount })
    }
    this._inputComment.focus()
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

  get menuItems() {
    const { user, currentUserId, id, sharingKey, showPopup, type } = this.props
    const isCurrentUserPost = user.id === currentUserId
    const url = __PROD__ ? `https://uniyo.io/open/posts/${sharingKey}` : `https://staging.uniyo.io/open/posts/${sharingKey}`
    const copyUrl = () => {
      showPopup('COPIED_URL')
      copyToClipboard(url)
    }
    const titleDelete = type === 'ANSWER' ? 'Delete answer' : 'Delete publication'
    const menu = isCurrentUserPost ? [{
      title: <span><MdDeleteForever data-icon='delete-forever' />{titleDelete}</span>,
      type: 'function',
      action: () => { this.props.postDelete({ postId: id }) },
    }, {
      title: <span><MdContentCopy /> Copy link</span>,
      type: 'function',
      action: copyUrl,
    }] : [{
      title: <span><MdContentCopy /> Copy link</span>,
      type: 'function',
      action: copyUrl,
    }]

    return menu
  }

  render() {
    const {
      id,
      text,
      user,
      embeds,
      commentsCount,
      donutsCount,
      currentUserLiked,
      imageCurrentUser,
      createdAt,
      commentsSearch,
      commentCreate,
      commentDelete,
      comments,
      showUserInfo,
      currentUserId,
      postGiveDonuts,
      userGiveDonuts,
      commentGiveDonuts,
      currentPostType,
      donutsThrow,
    } = this.props

    let sectionComemntClassNames = sectionContentComment
    if (!this.state.toggle) sectionComemntClassNames += ` ${show}`
    const time = moment.utc(createdAt).format("HH:mm A")
    const closePanel = () => { this.setState({ isDisplayDropDown: false }) }

    return (
      <VisibilitySensor
        key={id}
        onChange={::this.onChange}
      >
        <div className={wrapper}>
          <div className={sectionImage} onClick={() => showUserInfo(user.id)}>
            <img src={user.image.mediumUrl} alt="" />
          </div>
          <div className={sectionContent}>
            <div className={sectionContentHeader}>
              <span className={textUserName} onClick={() => showUserInfo(user.id)}>{user.firstName}</span>
              {/* <span className={textPostTime}>{time}</span> */}
              <span className={iconOpenMenu} onClick={() => { this.setState({ isDisplayDropDown: !this.state.isDisplayDropDown })}}><MdKeyboardArrowDown /></span>
                { this.state.isDisplayDropDown &&
                <PanelDropDownMenu
                  className={panelMenu}
                  closePanel={closePanel}
                  items={this.menuItems}
                  isDisplay={this.state.isDisplayDropDown}
                /> }
              </div>
              <TextPost
                text={text}
                showUserInfo={showUserInfo}
                currentPostType={currentPostType}
              />
              <div className={sectionContentFooter}>
                <div className={sectionFileDetail}>
                  {embeds.length > 0 && <img className={imgGif} src={embeds[0].url} />}
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
                <div className={this.state.toggle ? `${sectionContentComment} ${sectionContentCommentOpen}` : `${sectionContentComment} ${sectionContentCommentClose}` }>
                  <div className={sectionContentCommentForm}>
                    <InputComment
                      postId={id}
                      refTo={ref => this._inputComment = ref}
                      commentCreate={commentCreate}
                      imageCurrentUser={imageCurrentUser}
                      userPost={user}
                      closeCommentBox={::this.closeCommentBox}
                    />
                  </div>
                  <ul className={sectionContentCommentList}>
                    {comments && comments.map(comment =>
                      <ItemComment
                        key={comment.id}
                        showUserInfo={showUserInfo}
                        commentDelete={commentDelete}
                        commentGiveDonuts={commentGiveDonuts}
                        isOwnComment={comment.user.id === currentUserId}
                        {...comment}
                        >
                          {comment.text}
                        </ItemComment>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </VisibilitySensor>
          )
        }
      }
