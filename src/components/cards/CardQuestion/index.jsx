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
  ButtonDonut,
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
  footerSectionBtns,
  sectionContentUserName,
  sectionContentComment,
  sectionContentCommentList,
  sectionContentCommentOpen,
  sectionContentCommentClose,
  textUserName,
  textPostTime,
  sectionFileDetail,
  btnLike,
  btnComment,
  show,
  iconOpenMenu,
  panelMenu,
  imgGif,
} from '../style'

export default class CardQuestion extends PureComponent {

  state = {
    toggle: false,
    isDisplayDropDown: false,
  }

  closeCommentBox() {
    this.setState({
      toggle: false
    })
  }

  onChange() {
    const { id } = this.props
    this.props.onReadContent('POST_READ', id)
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

  get menuItems() {
    const { user, currentUserId, id, showPopup, sharingKey } = this.props
    const isCurrentUserPost = user.id === currentUserId
    const url = __PROD__ ? `https://uniyo.io/open/posts/${sharingKey}` : `https://staging.uniyo.io/open/posts/${sharingKey}`

    const copyUrl = () => {
      copyToClipboard(url)
      showPopup('COPIED_URL')
    }

    const menu = isCurrentUserPost ? [{
      title: <span><MdDeleteForever data-icon='delete-forever' /> Delete question</span>,
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
      answersCount,
      currentUserLiked,
      createdAt,
      allComments,
      commentsSearch,
      comments,
      commentDelete,
      commentCreate,
      commentGiveDonuts,
      showUserInfo,
      currentUserId,
      currentPostType,
      imageCurrentUser,
    } = this.props

    const time = moment.utc(createdAt).format("HH:mm A")
    const closePanel = () => { this.setState({ isDisplayDropDown: false }) }

    return (
      <VisibilitySensor
        onChange={::this.onChange}
        key={id}
      >
        <Link to={`/dashboard/questions/${id}`} className={wrapperLink} key={id}>
          <div key={id} className={wrapper}>
            <div className={sectionImage} onClick={(event) => { event.preventDefault(); showUserInfo(user.id) }}>
              <img src={user.image.mediumUrl} alt="" />
            </div>
            <div className={sectionContent}>
              <div className={sectionContentHeader}>
                <span className={textUserName} onClick={(event) => { event.preventDefault(); showUserInfo(user.id) }}>{user.firstName}</span>
                {/* <span className={textPostTime}>{time}</span> */}
                <span className={iconOpenMenu} onClick={(event) => { event.preventDefault(); this.setState({ isDisplayDropDown: !this.state.isDisplayDropDown }) }}><MdKeyboardArrowDown /></span>
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
                  <button className={btnComment} data-count={answersCount} onClick={(event) => ::this.onClickCommentHandler(event)}>Answers</button>
                  <ButtonDonut
                    className={btnLike}
                    donutsCount={donutsCount}
                    donutsThrow={donutsThrow}
                    onClick={::this.onClickDonutsHandler}
                  />
                </div>
              </div>
              <div className={this.state.toggle ? `${sectionContentComment} ${sectionContentCommentOpen}` : `${sectionContentComment} ${sectionContentCommentClose}` }>
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
          </Link>
        </VisibilitySensor>
      )
    }
  }
