import React, { PureComponent, PropTypes } from 'react'
import moment from 'moment'
import VisibilitySensor from 'react-visibility-sensor'
import { MdKeyboardArrowDown } from 'react-icons/lib/md'
import { MdContentCopy } from 'react-icons/lib/md'
import { MdDeleteForever } from 'react-icons/lib/md'
import { inputHandler } from '../../../utils'
const { copyToClipboard } = inputHandler

import {
  TextPost,
  Donut,
  ButtonDonut,
  ItemComment,
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
  sectionContentCommentOpen,
  sectionContentCommentClose,
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
  imgGif,
} from '../style'

import Star from './star.svg'

export default class CardReview extends PureComponent {

  state = {
    toggle: false,
    isDisplayDropDown: false,
  }

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
    this._inputComment.focus()
    this.setState({
      toggle: !this.state.toggle,
    })
  }

  onClickDonutsHandler(event) {
    const { postGiveDonuts, id } = this.props
    postGiveDonuts({ postId: id, amount: 1 })
  }

  get menuItems() {
    const { user, currentUserId, id, showPopup, sharingKey } = this.props
    const isCurrentUserPost = user.id === currentUserId

    const url = __PROD__ ? `https://uniyo.io/open/posts/${sharingKey}` : `https://staging.uniyo.io/open/posts/${sharingKey}`
    const copyUrl = () => {
      copyToClipboard(url)
      showPopup('COPIED_URL')
    }

    const menu = isCurrentUserPost ? [{
      title: <span><MdDeleteForever data-icon='delete-forever' /> Delete review</span>,
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
      showPopup,
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
          <img src={user.image.mediumUrl} alt="" />
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
              {embeds.length > 0 && <img className={imgGif} src={embeds[0].url} />}
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
          <div className={this.state.toggle ? `${sectionContentComment} ${sectionContentCommentOpen}` : `${sectionContentComment} ${sectionContentCommentClose}`}>
              <InputComment
                postId={id}
                refTo={ref => this._inputComment = ref}
                showUserInfo={showUserInfo}
                commentCreate={commentCreate}
                imageCurrentUser={imageCurrentUser}
                userPost={user}
                closeCommentBox={::this.closeCommentBox}
              />
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
