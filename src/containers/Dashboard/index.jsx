/* @flow */
import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../redux/actions'

import { Link, browserHistory } from 'react-router'

import authService from '../../services/authentification'
import * as pushNotification from '../../services/pushNotification'

import Dropzone from 'react-dropzone'
import Webcam from 'react-webcam'
import AvatarEditor from 'react-avatar-editor'

import {
  SidebarRight,
} from '../'

import {
  LayoutDashboard,
  Header,
  SidebarLeft,
  ButtonClose,
  NavPostType,
  Donut,
  NavChannel,
  NavDonuts,
  ModalProfilePictureUpdate,
  PanelDropDownSetting,
  Tooltip,
} from '../../components'

import {
  dropZone,
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
  overlayerProfilePictureUpdate,
  wrapperIcon,
  barPushNotificationItem,
} from './style.scss'

const mapStateToProps = state => ({
  auth: state.api.auth,
  rightbar: state.ui.rightbar,
  notifications: state.api.notifications,
  dashboard: state.ui.dashboard,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  showUserInfo: uiActions.showUserInfo,
  showChannelUsers: uiActions.showChannelUsers,
  showNotification: uiActions.showNotification,
  showHistoryDonut: uiActions.showHistoryDonut,
  hideSidebarRight: uiActions.hideSidebarRight,
  postsSearch: actions.postsSearch,
  signout: uiActions.signout,
  addDevice: actions.addDevice,
  deleteDevice: actions.deleteDevice,

  showPopup: uiActions.showPopup,
  donutsShake: uiActions.donutsShake,
  donutsThrow: uiActions.donutsThrow,
  userPictureUpdate: actions.userPictureUpdate,
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
    isOpenProfilePictureUpload: false,
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
    if (window.talkus && document.getElementsByClassName('talkus-body')[0]) {
      // window.talkus('hide')
      document.getElementsByClassName('talkus-body')[0].style.display = 'none'
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

    const { addDevice, deleteDevice } = this.props
    if (window) {
      pushNotification.subscribe(addDevice, deleteDevice)
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

  componentWillUnmount() {
    const { currentHashTag, currentPostType } = this.state
    const { hashtag, type = 'all' } = this.props.location.query
    const { postsSearch } = this.props
    // If query string is changed, get new posts.
    if (window.talkus && document.getElementsByClassName('talkus-body')[0]) {
      // window.talkus('hide')
      document.getElementsByClassName('talkus-body')[0].style.display = 'none'
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

    const { addDevice, deleteDevice } = this.props
    if (window) {
      pushNotification.subscribe(addDevice, deleteDevice)
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

  openUpdateProfile() {
    this.setState({ isOpenProfilePictureUpload: true })
  }


  get renderContent() {
    const {
      showUserInfo,
      showChannelUsers,
      showNotification,
      auth,
      router,
      dashboard,
      showPopup,
      rightbar,
      hideSidebarRight,
      location,
      notifications,
      uiStateHeader,
      donutsShake,
      donutsThrow,
      showHistoryDonut,
      signout,
      contentReadCheckNotification,
      userPictureUpdate,
    } = this.props

    const { currentUser } = auth
    const { all: allNotifications, unReadChannelIds } = notifications

    const { currentHashTag, currentPostType } = this.state

    const { hashtag, type } = location.query
    const { isOpen } = rightbar
    const toggleDisplayRightBar = isOpen ? mainShrink : mainExpand

    /* **************************************
      [start] channel feature
     *************************************** */

    const childComponents = React.Children.map(this.props.children, child => React.cloneElement(child, {
      // allPosts,
      hashtag,
      type: TYPES[type],
      currentHashTag,
      currentPostType,
      notifications,
      unReadChannelIds,
      contentReadCheckNotification,
      onClearCurrentTypeHandler: this.onClearCurrentTypeHandler.bind(this),
      onReadContent: this.onReadContent.bind(this),
    }))

    const isMainDashboard = this.props.location.pathname === '/dashboard'
    const regexQuestionDashboard = /\/dashboard\/questions/
    const isQuestionDashboard = regexQuestionDashboard.test(this.props.location.pathname)

    return (
      <div className={container}>
        <SidebarLeft
          isMainDashboard={isMainDashboard}
          selectedHashtag={this.props.location.query.hashtag}
          locationParams={this.props.params}
          type={type}
        />
        <div className={[main, toggleDisplayRightBar].join(' ')}>
          <Header
            currentPostType={currentPostType}
            isQuestionDashboard={isQuestionDashboard}
            hashtag={hashtag}
            router={this.props.router}
            location={this.props.location}
            onSelectPostType={::this.onSelectPostType}
          />
          <div className={mainContent}>
            {childComponents}
            <SidebarRight
              hideSidebarRight={hideSidebarRight}
              location={this.props.location}
              openUpdateProfile={::this.openUpdateProfile}
            />
          </div>
        </div>
      </div>
    )
  }

  get renderLoading() {
    return (
      <div />
    )
  }

  render() {
    const { userPictureUpdate } = this.props
    const closeProfilePictureUpdate = () => this.setState({ isOpenProfilePictureUpload: false })
    // TODO: fetching case
    return (
      <LayoutDashboard>
        {this.state.isOpenProfilePictureUpload && <ModalProfilePictureUpdate closeProfilePictureUpdate={closeProfilePictureUpdate} userPictureUpdate={userPictureUpdate} />}
        {this.state.isOpenNotificationBar && pushNotification.permissionStatus === "default" &&
        <div className={barPushNotification}>
          <Donut size="sm" />
          We strongly recommend enabling desktop notifications if you'll be using Uniyo on this computer.&nbsp;
          <span className={barPushNotificationItem}>
            😎
            <span
              className={textEnableNotification}
              onClick={() => { this.setState({ isOpenNotificationBar: false }); pushNotification.requestPermissionForNotifications()}}
            >
              Enable notifications
            </span>
          </span>
          <span className={barPushNotificationItem}>
            👵🏻
            <span
              className={textEnableNotification}
              onClick={() => this.setState({ isOpenNotificationBar: false })}
            >
               Ask me next time.
            </span>
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
