/* @flow */
import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import { Link, browserHistory } from 'react-router'

import uiActions from '../../redux/actions'
import authService from '../../services/authentification'
import * as pushNotification from '../../services/pushNotification'

import {
  SidebarRight,
} from '../'

import {
  LayoutDashboard,
  SidebarLeft,
  ButtonClose,
  NavPostType,
  Donut,
  NavChannel,
  NavDonuts,
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
  icon,
  notification,
  boxDonuts,
  boxDonutsRow,
  receiveDonutsActive,
  moveDonuts,
  donuts,
  barPushNotification,
  barPushNotificationButtonSubscribe,
  barPushNotificationButtonClose,
  textEnableNotification,
  panelSetting,
  popup,
  popupEmoji,
} from './style'

import Setting from './settings.svg'
import Notification from './notification.svg'

const mapStateToProps = state => ({
  auth: state.api.auth,
  users: state.api.users,
  posts: state.api.posts,
  comments: state.api.comments,
  hashtags: state.api.hashtags.all,
  hashtagsTrending: state.api.hashtags.trending,
  rightbar: state.ui.rightbar,
  dashboard: state.ui.dashboard,
  uiStateHeader: state.ui.header,
  channels: state.api.channels,
  answers: state.api.answers,
  messages: state.api.messages,
  notifications: state.api.notifications,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postInfo: actions.postInfo,
  postsSearch: actions.postsSearch,
  postCreate: actions.postCreate,
  postDelete: actions.postDelete,
  postsRelevantSearch: actions.postsRelevantSearch,
  postsTrendingSearch: actions.postsTrendingSearch,
  postGiveDonuts: actions.postGiveDonuts,
  answerSearch: actions.answerSearch,
  answerCreate: actions.answerCreate,

  commentsSearch: actions.commentsSearch,
  commentCreate: actions.commentCreate,
  commentGiveDonuts: actions.commentGiveDonuts,
  commentDelete: actions.commentDelete,

  userSearch: actions.userSearch,
  userGiveDonuts: actions.userGiveDonuts,

  hashtagAdd: actions.hashtagAdd,
  hashtagDelete: actions.hashtagDelete,
  hashtagSearch: actions.hashtagSearch,

  channelSearch: actions.channelSearch,
  channelCreate: actions.channelCreate,
  messageSearch: actions.messageSearch,
  messageCreate: actions.messageCreate,

  showUserInfo: uiActions.showUserInfo,
  showChannelUsers: uiActions.showChannelUsers,
  showNotification: uiActions.showNotification,
  showHistoryDonut: uiActions.showHistoryDonut,
  hideSidebarRight: uiActions.hideSidebarRight,

  signout: uiActions.signout,
  addDevice: actions.addDevice,

  showPopup: uiActions.showPopup,
  donutsShake: uiActions.donutsShake,
  donutsThrow: uiActions.donutsThrow,

  contentReadCheckNotification: uiActions.contentReadCheckNotification,
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
    isOpenSettingMenu: false,
    isOpenNotificationBar: true,
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

  componentDidMount() {
    const { currentHashTag, currentPostType } = this.state
    const { hashtag, type = 'all' } = this.props.location.query
    const { postsSearch } = this.props
    // If query string is changed, get new posts.
    if (window.talkus) {
      window.talkus('hide')
    }
    this.setState({
      currentHashTag: hashtag,
      currentPostType: TYPES[type],
    })

    const params = {}
    const typeForQuery = [TYPES[type]]
    if (hashtag) { params.hashtags = [hashtag] }
    if (typeForQuery && TYPES[type] !== 'ALL') { params.types = typeForQuery }
    postsSearch(params)

    const { addDevice } = this.props
    if (window) {
      pushNotification.subscribe(addDevice)
    }
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
      if (typeForQuery && TYPES[type] !== 'ALL') { params.types = typeForQuery }
      postsSearch(params)
    }
  }

  onSelectPostType(type) {
    this.setState({
      currentPostType: type,
    })
  }

  onReadContent(contentType, id) {
    const { contentReadCheckNotification } = this.props
    if (contentType === 'POST_READ') {
      const ids = this.props.notifications.unReadPostIds.filter((idsObject) => idsObject.postId === id)
      if (ids.length > 0) {
        contentReadCheckNotification({ contentType, ids })
      }
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

      comments,
      commentCreate,
      commentsSearch,
      commentDelete,
      commentGiveDonuts,

      posts,
      postInfo,
      postCreate,
      postsSearch,
      postDelete,
      postsTrendingSearch,
      postsRelevantSearch,
      postGiveDonuts,

      channelSearch,
      channelCreate,
      channels,

      auth,
      users,
      userSearch,
      userGiveDonuts,

      dashboard,
      showPopup,
      rightbar,
      hideSidebarRight,
      location,

      messages,
      messageSearch,
      messageCreate,

      hashtags,
      hashtagSearch,
      hashtagsTrending,
      hashtagAdd,
      hashtagDelete,

      answers,
      answerSearch,
      answerCreate,

      notifications,

      uiStateHeader,
      donutsShake,
      donutsThrow,
      showHistoryDonut,
      signout,
      contentReadCheckNotification,
    } = this.props

    const { currentUser } = auth
    const { hashtags: hashtagsCurrentUser, image } = currentUser
    const { all: allPosts, fetching: isPostsFetching, trending: trendingPosts, relevant: relevantPosts } = posts
    const { all: suggestionedUsers } = users
    const { all: allComments } = comments
    const { all: allChannels } = channels
    const { all: allAnswers } = answers
    const { all: allMessages } = messages
    const { all: allNotifications, unReadChannelIds } = notifications
    const { isReceiveDonuts, isSpentDonuts } = uiStateHeader

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

    if (hashtag) {
      // combine all trendingPosts relevantPosts allPosts and filter them
      sortedPosts = [ ...trendingPosts, ...relevantPosts, ...sortedPosts ]
      sortedPosts = sortedPosts.filter(post => {
        const hashtag:String = `#${this.props.location.query.hashtag.toLowerCase()}`
        const matched:Array = post.text.match(regexTag) || []
        return matched.map(hashtag => hashtag.toLowerCase()).includes(hashtag)
      })
    }

    if (type) {
      sortedPosts = sortedPosts.filter(post => post.type === TYPES[type])
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
      allAnswers,
      allPosts,
      postsSearch,
      postCreate,
      postDelete,
      showUserInfo,
      showChannelUsers,
      showNotification,
      commentsSearch,
      commentCreate,
      hideSidebarRight,
      suggestionedUsers,
      currentUser,
      hashtags,
      messageSearch,
      messageCreate,
      channelSearch,
      channelCreate,
      currentHashTag,
      currentPostType,
      answerSearch,
      answerCreate,
      postInfo,
      rightbar,
      postsTrendingSearch,
      postsRelevantSearch,
      trendingPosts,
      relevantPosts,
      postGiveDonuts,
      userGiveDonuts,
      commentGiveDonuts,
      donutsThrow,
      hashtagAdd,
      hashtagSearch,
      showHistoryDonut,
      signout,
      notifications,
      unReadChannelIds,
      contentReadCheckNotification,
      commentDelete,
      showPopup,
      onClearCurrentTypeHandler: this.onClearCurrentTypeHandler.bind(this),
      onReadContent: this.onReadContent.bind(this),
    }))

    const unreadNotification = allNotifications.filter(notification => !notification.isRead)
    const isMainDashboard = this.props.location.pathname === "/dashboard"
    const regexQuestionDashboard = /\/dashboard\/questions/
    const isQuestionDashboard = regexQuestionDashboard.test(this.props.location.pathname)
    const onClickShowCurrentUserInfo = () => showUserInfo(currentUser.id)
    const onClickSignout = () => this.props.signout()

    return (
      <div className={container}>
        <SidebarLeft
          suggestionedUsers={suggestionedUsers}
          userSearch={userSearch}
          hashtags={hashtags}
          hashtagSearch={hashtagSearch}
          hashtagsCurrentUser={hashtagsCurrentUser}
          allChannels={allChannels}
          channelCreate={channelCreate}
          hashtagsTrending={hashtagsTrending}
          hashtagAdd={hashtagAdd}
          hashtagDelete={hashtagDelete}
          unreadNotification={unreadNotification}
          isMainDashboard={isMainDashboard}
          selectedHashtag={this.props.location.query.hashtag}
          locationParams={this.props.params}
          contentReadCheckNotification={contentReadCheckNotification}
          unReadChannelIds={unReadChannelIds}
          currentUser={currentUser}
          type={type}
        />
        <div className={[main, toggleDisplayRightBar].join(' ')}>
          <header className={header}>
            <div className={headerNavBasic}>
              { allNotifications &&
                allNotifications.filter(notification => !notification.isRead).length > 0 ?
                <span className={notification} onClick={() => showNotification()}>
                  {allNotifications.filter(notification => !notification.isRead).length}
                </span> :
                <Notification className={icon} onClick={() => showNotification()} />
              }
              <Setting className={icon} onClick={() => this.setState({ isOpenSettingMenu: !this.state.isOpenSettingMenu })} />
              { this.state.isOpenSettingMenu &&
                <div className={panelSetting}>
                  <ul>
                    <li onClick={onClickShowCurrentUserInfo}>Profile</li>
                    <li onClick={onClickSignout}>Logout</li>
                  </ul>
                </div>
              }
            </div>
            {!isChannel ?
              <NavPostType
                onSelectPostType={::this.onSelectPostType}
                currentPostType={isQuestionDashboard ? TYPES['questions']: currentPostType}
                currentHashTag={hashtag}
              /> :
              <NavChannel
                channel={channel}
                showUserInfo={showUserInfo}
                showChannelUsers={showChannelUsers}
              />
            }
            <NavDonuts
              donutsShake={donutsShake}
              isReceiveDonuts={isReceiveDonuts}
              isSpentDonuts={isSpentDonuts}
              showHistoryDonut={showHistoryDonut}
              availableDonutsCount={currentUser.availableDonutsCount}
              receivedDonutsCount={currentUser.receivedDonutsCount}
            />
          </header>
          <div className={mainContent}>
            {childComponents}
          </div>
        </div>
        <SidebarRight hideSidebarRight={hideSidebarRight} location={this.props.location} />
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
        {this.state.isOpenNotificationBar && pushNotification.permissionStatus === "default" &&
        <div className={barPushNotification}>
          <Donut size="sm" />
          Uniyo needs your permission to&nbsp;
          <span
            className={textEnableNotification}
            onClick={() => { this.setState({ isOpenNotificationBar: false }); pushNotification.requestPermissionForNotifications()}}
            >
              enable desktop notifications.
            </span>
            <ButtonClose
              className={barPushNotificationButtonClose}
              onClick={() => this.setState({ isOpenNotificationBar: false })}
            />
          </div>
        }
        {this.props.dashboard.isDisplayPopup &&
          <div className={popup}>
            <span className={popupEmoji}>👍</span>
            <span>Link copied to your clipboard</span>
          </div>
         }
        { this.renderContent }
      </LayoutDashboard>
    )
  }
}
