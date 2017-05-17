/* @flow */

import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../redux/actions'
import { Link } from 'react-router'
import authService from '../../services/authentification'
import { browserHistory } from 'react-router'

import {
  SidebarRight,
} from '../'

import {
  LayoutDashboard,
  SidebarLeft,
  NavPostType,
  Donnut,
  InputPost,
  NavChannel,
} from '../../components'

import {
  error,
  container,
  main,
  header,
  headerNavBasic,
  mainContent,
  mainShrink,
  mainExpand,
  footer,
  barNoification,
  inputPostWrapper,
  inputPostWrapperImageBox,
  input,
  icon,
  notification,
} from './style'

import Setting from './settings.svg'
import Notification from './notification.svg'

const mapStateToProps = state => ({
  auth: state.api.auth,
  users: state.api.users,
  posts: state.api.posts,
  comments: state.api.comments,
  hashtagsTrending: state.api.hashtags.trending,
  rightbar: state.ui.rightbar,
  channels: state.api.channels,
  answers: state.api.answers,
  messages: state.api.messages,
  notifications: state.api.notifications,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postsSearch: actions.postsSearch,
  postCreate: actions.postCreate,
  commentsSearch: actions.commentsSearch,
  commentCreate: actions.commentCreate,
  userSearch: actions.userSearch,
  showUserInfo: uiActions.showUserInfo,
  showChannelUsers: uiActions.showChannelUsers,
  showNotification: uiActions.showNotification,
  hideSidebarRight: uiActions.hideSidebarRight,
  channelSearch: actions.channelSearch,
  channelCreate: actions.channelCreate,
  messageSearch: actions.messageSearch,
  messageCreate: actions.messageCreate,
  hashtagAdd: actions.hashtagAdd,
  hashtagDelete: actions.hashtagDelete,
  postInfo: actions.postInfo,
  answerSearch: actions.answerSearch,
  answerCreate: actions.answerCreate,
}, dispatch)

const regexTag = /#([ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿa-zA-Z0-9-]+)/g

const TYPES = {
  docs: 'CLASS_NOTE',
  post: 'POST',
  reviews: 'REVIEW',
  questions: 'QUESTION',
  all: 'ALL',
}

const DOWN = "ArrowDown"
const UP = "ArrowUp"
const ENTER = "Enter"

@connect(mapStateToProps, mapDispatchToProps)
export default class DashBoard extends Component {

  static propTypes = {
    location: PropTypes.objectOf.isRequired,
  }

  state = {
    currentHashTag: '',
    currentPostType: '',
  }

  componentWillMount() {
    const { hashtag, type = 'all' } = this.props.location.query

    if (!authService.isTokenExist) {
      browserHistory.push('/')
    }

    this.setState({
      currentHashTag: hashtag,
      currentPostType: TYPES[type],
    })
  }

  onSelectPostType(type) {
    this.setState({
      currentPostType: type,
    })
  }

  componentWillReceiveProps(prevProps, nextProps) {
    const { currentHashTag, currentPostType } = this.state
    const { hashtag, type = 'all' } = prevProps.location.query
    const { postsSearch } = this.props

    // If query string is changed, get new posts.
    if (currentHashTag !== hashtag || currentPostType !== TYPES[type]) {
      this.setState({
        currentHashTag: hashtag,
        currentPostType: TYPES[type],
      })

      const params = {}
      const typeForQuery = [TYPES[type]]
      if (hashtag) { params.hashtags = [hashtag] }
      if (typeForQuery && typeForQuery !== 'ALL') { params.types = [TYPES[type]] }
      postsSearch(params)
    }
  }

  onClearCurrentTypeHandler() {
    this.setState({
      currentHashTag: undefined,
    })
  }

  get renderContent() {
    const {
      showUserInfo,
      showChannelUsers,
      showNotification,
      commentCreate,
      commentsSearch,
      postCreate,
      postsSearch,
      userSearch,
      posts,
      comments,
      auth,
      hideSidebarRight,
      users,
      rightbar,
      location,
      messageSearch,
      messageCreate,
      channelSearch,
      channelCreate,
      channels,
      hashtagsTrending,
      hashtagAdd,
      hashtagDelete,
      answerSearch,
      answerCreate,
      postInfo,
      answers,
      messages,
      notifications,
    } = this.props

    const { currentUser } = auth
    const { hashtags: hashtagsCurrentUser, image } = currentUser
    const { all: allPosts, fetching: isPostsFetching } = posts
    const { all: suggestionedUsers } = users
    const { all: allComments } = comments
    const { all: allChannels } = channels
    const { all: allAnswers } = answers
    const { all: allMessages } = messages
    const { all: allNotifications } = notifications

    const { currentHashTag, currentPostType } = this.state
    const { hashtag, type } = location.query
    const { isOpen } = rightbar
    const toggleDisplayRightBar = isOpen ? mainShrink : mainExpand

    /* **************************************
      [start] channel feature
     *************************************** */

    const regex = new RegExp(/\/dashboard\/channels\/\d+/)
    const path = this.props.location.pathname

    let isChannel = false
    let channel

    if (path.match(regex)) {
      isChannel = true
      const { channelId } = this.props.router.params
      channel = allChannels.filter(channel => channel.id == channelId)[0]
      if (!channel) {
        //redirect
      }
    }

    /* **************************************
      [end] channel feature
     *************************************** */

    /* **************************************
      [start] filter feature
     *************************************** */

    let sortedPosts = allPosts

    // TODO: sort by createdAt

    if (hashtag) {
      sortedPosts = sortedPosts.filter(post => {
        const hashtag:String = `#${this.props.location.query.hashtag.toLowerCase()}`
        const matched:Array = post.text.match(regexTag) || []
        return matched.map(hashtag => hashtag.toLowerCase()).includes(hashtag)
      })
    }

    if (type) {
      sortedPosts = sortedPosts.filter(post => post.postType === TYPES[type])
    }

    /* **************************************
      [end] filter feature
     *************************************** */

    const childComponents = React.Children.map(this.props.children, child => React.cloneElement(child, {
      posts: sortedPosts,
      hashtag,
      isPostsFetching,
      type: TYPES[type],
      userSearch,
      allComments,
      allMessages,
      allChannels,
      postsSearch,
      postCreate,
      showUserInfo,
      showChannelUsers,
      showNotification,
      commentsSearch,
      commentCreate,
      hideSidebarRight,
      suggestionedUsers,
      currentUser,
      messageSearch,
      messageCreate,
      channelSearch,
      channelCreate,
      currentHashTag,
      currentPostType,
      answerSearch,
      answerCreate,
      postInfo,
      allAnswers,
      onClearCurrentTypeHandler: this.onClearCurrentTypeHandler.bind(this),
    }))

    return (
      <div className={container}>
        <SidebarLeft
          hashtagsCurrentUser={hashtagsCurrentUser}
          allChannels={allChannels}
          hashtagsTrending={hashtagsTrending}
          hashtagAdd={hashtagAdd}
          hashtagDelete={hashtagDelete}
          type={type}
        />
        <div className={[main, toggleDisplayRightBar].join(' ')}>
          <header className={header}>
            <div className={headerNavBasic}>
              <Notification className={icon} onClick={() => showNotification()} />
              { allNotifications &&
                allNotifications.filter(notification => !notification.isRead).length > 0 &&
                <span className={notification}> {allNotifications.filter(notification => !notification.isRead).length}</span>
              }
              <Setting className={icon} />
            </div>
            {!isChannel ?
              <NavPostType
                onSelectPostType={::this.onSelectPostType}
                currentPostType={this.state.currentPostType}
                currentHashTag={hashtag}
              /> :
              <NavChannel
                channel={channel}
                showUserInfo={showUserInfo}
                showChannelUsers={showChannelUsers}
              />
            }
            <div>
              <Donnut size="large" />
            </div>
          </header>
          <div className={mainContent}>
            {childComponents}
          </div>
        </div>
        <SidebarRight hideSidebarRight={hideSidebarRight} />
      </div>
    )
  }

  get renderLoading() {
    return (
      <div />
    )
  }

  render() {
    const { fetching } = this.props.posts

    // TODO: fetching case
    return (
      <LayoutDashboard>
        { this.renderContent }
      </LayoutDashboard>
    )
  }
}
