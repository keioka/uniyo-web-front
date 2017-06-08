/* @flow */

import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import { Link } from 'react-router'

import {
  wrapper,
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
} from './style'

import {
  SidebarRightHistoryDonuts,
  SidebarRightNotification,
  SidebarRightUserInfo,
  SidebarRightChannelUsers,
} from '../../components'

import uiAction from '../../redux/actions'

const mapStateToProps = state => ({
  donutsHistory: state.api.auth.currentUser.donutsHistory,
  rightbar: state.ui.rightbar,
  channels: state.api.channels,
  notifications: state.api.notifications,
  formNotifications: state.form.notifications,
  users: state.api.users,
})

const {
  showUserInfo,
  showNotification,
  showHistoryDonut,
  hideUserInfo,
  hideNotification,
  hideHistoryDonut,
  setReadNotificationIds,
} = uiAction

const {
  channelCreate,
  notificationReadMark,
  notificationSearch,
  userGiveDonuts,
  userSearch,
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
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarRight extends Component {

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
      userGiveDonuts,
      userSearch,
      hideSidebarRight,
    } = this.props

    const { displayType, isOpen, userInfo, channelUsers } = rightbar
    const { all: allUsers } = users
    const { all: allChannels } = channels
    const { all: allNotifications } = notifications

    switch(displayType) {
      case 'UserInfo': {
        return (
          <SidebarRightUserInfo
            user={userInfo}
            channels={allChannels}
            channelCreate={channelCreate}
            userGiveDonuts={userGiveDonuts}
            hideSidebarRight={hideSidebarRight}
          />
        )
      }

      case 'ChannelUsers': {
        return (
          <SidebarRightChannelUsers
            channelUsers={channelUsers}
            hideSidebarRight={hideSidebarRight}
          />
        )
      }

      case 'Notification': {
        return (
          <SidebarRightNotification
            allNotifications={allNotifications}
            notificationSearch={notificationSearch}
            notificationReadMark={notificationReadMark}
            hideSidebarRight={hideSidebarRight}
          />
        )
      }

      case 'Donuts': {
        return (
          <SidebarRightHistoryDonuts
            userSearch={userSearch}
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

  generateDonuts() {
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

    // const userImages = campusDonuts && campusDonuts.length > 0 && [...new Set(donutsHistory.map(user => {
    //   return user.image.mediumUrl
    // }))].slice(0, 1)

    const animationClasses = [ imageAnimationOne, imageAnimationTwo, imageAnimationThree ]

    return (
      <div>
      {campusDonuts && campusDonuts.length > 0 && campusDonuts.slice(0, 1).map((user, index) => {
        const animationClass = animationClasses[index]
        const classNames = [image, animationClass].join(' ')
        return (
          <div className={classNames} data-image-id={index+1}>
            <img src={user.image.mediumUrl} alt="" />
          </div>
        )
      })}
      </div>
    )
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

    return (
      <div>
        <aside className={wrapperClassNames.join(' ')}>
          {isOpen && <div className={close} onClick={() => hideSidebarRight()}></div>}
          {this.display()}
        </aside>
        { !isOpen &&
        <div className={btnDonutsHistory}>
          <div className={btnDonutsHistoryInner}>
            {this.generateDonuts()}
            <button className={btn} onClick={() => showHistoryDonut()}>open</button>
          </div>
        </div>
        }
     </div>
    )
  }
}
