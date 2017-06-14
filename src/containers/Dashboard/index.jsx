/* @flow */
import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import { Link, browserHistory } from 'react-router'
import Rx from 'rx'

import uiActions from '../../redux/actions'
import authService from '../../services/authentification'
import * as pushNotification from '../../services/pushNotification'

import {
  SidebarRight,
} from '../'

import {
  LayoutDashboard,
  SidebarLeft,
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
  uiStateHeader: state.ui.header,
  channels: state.api.channels,
  answers: state.api.answers,
  messages: state.api.messages,
  notifications: state.api.notifications,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postsSearch: actions.postsSearch,
  postCreate: actions.postCreate,
  postsRelevantSearch: actions.postsRelevantSearch,
  postsTrendingSearch: actions.postsTrendingSearch,
  commentsSearch: actions.commentsSearch,
  commentCreate: actions.commentCreate,
  userSearch: actions.userSearch,
  showUserInfo: uiActions.showUserInfo,
  showChannelUsers: uiActions.showChannelUsers,
  showNotification: uiActions.showNotification,
  hideSidebarRight: uiActions.hideSidebarRight,
  signout: uiActions.signout,
  channelSearch: actions.channelSearch,
  channelCreate: actions.channelCreate,
  messageSearch: actions.messageSearch,
  messageCreate: actions.messageCreate,
  hashtagAdd: actions.hashtagAdd,
  hashtagDelete: actions.hashtagDelete,
  postInfo: actions.postInfo,
  answerSearch: actions.answerSearch,
  answerCreate: actions.answerCreate,
  userGiveDonuts: actions.userGiveDonuts,
  commentGiveDonuts: actions.commentGiveDonuts,
  postGiveDonuts: actions.postGiveDonuts,
  addDevice: actions.addDevice,
  donutsShake: uiActions.donutsShake,
  donutsThrow: uiActions.donutsThrow,
  showHistoryDonut: uiActions.showHistoryDonut,
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
    pushNotification.subscribe(addDevice)
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
    contentReadCheckNotification({ contentType, id })
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
      postsTrendingSearch,
      postsRelevantSearch,
      postGiveDonuts,
      userGiveDonuts,
      commentGiveDonuts,
      uiStateHeader,
      donutsShake,
      donutsThrow,
      showHistoryDonut,
      signout,
    } = this.props

    const { currentUser } = auth
    const { hashtags: hashtagsCurrentUser, image } = currentUser
    const { all: allPosts, fetching: isPostsFetching, trending: trendingPosts, relevant: relevantPosts } = posts
    const { all: suggestionedUsers } = users
    const { all: allComments } = comments
    const { all: allChannels } = channels
    const { all: allAnswers } = answers
    const { all: allMessages } = messages
    const { all: allNotifications } = notifications
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

    // TODO: sort by createdAt

    if (hashtag) {
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
      showHistoryDonut,
      signout,
      onClearCurrentTypeHandler: this.onClearCurrentTypeHandler.bind(this),
      onReadContent: this.onReadContent.bind(this),
    }))

    const unreadNotification = allNotifications.filter(notification => !notification.isRead)
    const isMainDashboard = this.props.location.pathname === "/dashboard"
    const regexQuestionDashboard = /\/dashboard\/questions/
    const isQuestionDashboard = regexQuestionDashboard.test(this.props.location.pathname)

    return (
      <div className={container}>
        <SidebarLeft
          hashtagsCurrentUser={hashtagsCurrentUser}
          allChannels={allChannels}
          hashtagsTrending={hashtagsTrending}
          hashtagAdd={hashtagAdd}
          hashtagDelete={hashtagDelete}
          unreadNotification={unreadNotification}
          isMainDashboard={isMainDashboard}
          selectedHashtag={this.props.location.query.hashtag}
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
                    <li onClick={() => this.props.signout()}>Logout</li>
                    <li></li>
                    <li></li>
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
          UniYo needs your permission to &nbsp;
          <span
            className={textEnableNotification}
            onClick={() => { this.setState({ isOpenNotificationBar: false }); pushNotification.requestPermissionForNotifications()}}
            >
            enable desktop notifications.
          </span>
          <button
            className={barPushNotificationButtonClose}
            onClick={() => this.setState({ isOpenNotificationBar: false })}
          >
            X
          </button>
        </div>
        }
        { this.renderContent }
      </LayoutDashboard>
    )
  }
}
