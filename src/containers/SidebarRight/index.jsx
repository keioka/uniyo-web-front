/* @flow */

import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import { Link } from 'react-router'

import {
  wrapper,
  wrapperBtn,
  sidebarOpen,
  sidebarClose,
  userInfo,
  notification,
  historyDonut,
  close,
  btnDonutsHistory,
  btnDonutsHistoryInner,
  image,
  imageAnimationOne,
  imageAnimationTwo,
  imageAnimationThree,
  btn,
  btnInner,
  btnGiveDonuts,
  donutSmallOne,
  donutSmallTwo,
  donutSmallThree,
  overlayerProfilePictureUpdate,
} from './style'

import {
  SidebarRightHistoryDonuts,
  SidebarRightNotification,
  SidebarRightUserInfo,
  SidebarRightChannelUsers,
  Donut,
  ButtonClose,
} from '../../components'

import uiAction from '../../redux/actions'

const mapStateToProps = state => ({
  donutsHistory: state.api.auth.currentUser.donutsHistory,
  rightbar: state.ui.rightbar,
  posts: state.api.posts,
  channels: state.api.channels,
  notifications: state.api.notifications,
  formNotifications: state.form.notifications,
  users: state.api.users,
  currentUser: state.api.auth.currentUser,
})

const {
  showUserInfo,
  showNotification,
  showHistoryDonut,
  hideUserInfo,
  hideNotification,
  hideHistoryDonut,
  setReadNotificationIds,
  donutsCampusShift,
} = uiAction

const {
  channelCreate,
  notificationReadMark,
  notificationSearch,
  userGiveDonuts,
  userSearch,
  postInfo,
} = actions

const mapDispatchToProps = dispatch => bindActionCreators({
  showUserInfo,
  showNotification,
  showHistoryDonut,
  hideUserInfo,
  hideNotification,
  hideHistoryDonut,
  channelCreate,
  notificationSearch,
  notificationReadMark,
  setReadNotificationIds,
  userGiveDonuts,
  userSearch,
  donutsCampusShift,
  postInfo,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarRight extends Component {

  state = {
    isSpreadDonuts: false,
  }

  display() {
    const {
      users,
      rightbar,
      channelCreate,
      channels,
      notifications,
      setReadNotificationIds,
      notificationSearch,
      notificationReadMark,
      donutsHistory,
      showHistoryDonut,
      showUserInfo,
      userGiveDonuts,
      userSearch,
      hideSidebarRight,
      currentUser,
      openUpdateProfile,
      posts,
      postInfo,
    } = this.props

    const { displayType, isOpen, userInfo, channelUserIds } = rightbar
    const { all: allUsers } = users
    const { all: allChannels } = channels
    const { all: allPosts } = posts
    const { all: allNotifications } = notifications
    const channelUsers = channelUserIds && channelUserIds.map(userId => allUsers.filter(user => user.id === userId)[0])
    switch(displayType) {
      case 'UserInfo': {
        return (
          <SidebarRightUserInfo
            allUsers={allUsers}
            userId={userInfo.id}
            showHistoryDonut={showHistoryDonut}
            channels={allChannels}
            channelCreate={channelCreate}
            currentUser={currentUser}
            userGiveDonuts={userGiveDonuts}
            hideSidebarRight={hideSidebarRight}
            openUpdateProfile={openUpdateProfile}
          />
        )
      }

      case 'ChannelUsers': {
        return (
          <SidebarRightChannelUsers
            allUsers={allUsers}
            channelUsers={channelUsers}
            currentUser={currentUser}
            hideSidebarRight={hideSidebarRight}
            userGiveDonuts={userGiveDonuts}
            channelCreate={channelCreate}
            allChannels={allChannels}
          />
        )
      }

      case 'Notification': {
        return (
          <SidebarRightNotification
            currentUser={currentUser}
            allPosts={allPosts}
            postInfo={postInfo}
            allNotifications={allNotifications}
            showHistoryDonut={showHistoryDonut}
            showUserInfo={showUserInfo}
            notificationSearch={notificationSearch}
            notificationReadMark={notificationReadMark}
            hideSidebarRight={hideSidebarRight}
          />
        )
      }

      case 'Donuts': {
        return (
          <SidebarRightHistoryDonuts
            currentUser={currentUser}
            userSearch={userSearch}
            userGiveDonuts={userGiveDonuts}
            showHistoryDonut={showHistoryDonut}
            rightbar={rightbar}
            channelCreate={channelCreate}
            allChannels={allChannels}
            allUsers={allUsers}
            donutsHistory={donutsHistory}
            hideSidebarRight={hideSidebarRight}
          />
        )
      }
    }
  }

  generateUserImagePopup() {
    const {
      channelCreate,
      channels,
      showHistoryDonut,
      hideSidebarRight,
      donutsHistory,
      notificationSearch,
      rightbar,
    } = this.props

    const { displayType, isOpen, userInfo, campusDonuts } = rightbar

    const animationClasses = [ imageAnimationOne, imageAnimationTwo, imageAnimationThree ]
    return (
      <div>
      {campusDonuts && campusDonuts.length > 0 && campusDonuts.map((user, index) => {
        const style = {
          transitionDelay: `${1}s`,
        }
        const animationClass = imageAnimationOne
        const classNames = [image, animationClass].join(' ')
        return (
          <div className={classNames} style={style} data-image-id={index+1}>
            <img src={user.image.mediumUrl} alt="" />
          </div>
        )
      })}
      </div>
    )
  }

  onClickSpreadDonuts() {
    this.setState({
      isSpreadDonuts: true,
    })
  }

  render() {
    const {
      channelCreate,
      channels,
      showHistoryDonut,
      hideSidebarRight,
      donutsHistory,
      notificationSearch,
      rightbar,
    } = this.props

    const { displayType, isOpen, userInfo, campusDonuts } = rightbar
    const { all: allChannels } = channels
    const wrapperClassNames = isOpen ? [wrapper, sidebarOpen] : [wrapper, sidebarClose]
    const regexChannelPath = /dashboard\/channels\/[1-9]+/
    const regexChannelNewPath = /dashboard\/channels\/new/
    const isChannel = regexChannelPath.test(this.props.location.pathname)
    const isChannelNew = regexChannelNewPath.test(this.props.location.pathname)
    return (
      <div>
        <aside className={wrapperClassNames.join(' ')}>
          {isOpen && <div className={close} onClick={() => hideSidebarRight()}><ButtonClose /></div>}
          {this.display()}
        </aside>
        { !isOpen && !isChannel && !isChannelNew &&
          <div className={btnDonutsHistory}>
            <div className={btnDonutsHistoryInner}>
              {this.generateUserImagePopup()}
            </div>
          </div>
        }
      </div>
    )
  }
}
