/* @flow */

import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import { Link } from 'react-router'

import {
  wrapper,
  userInfo,
  notification,
  historyDonut,
  close,
  btnDonutsHistory,
  btnDonutsHistoryInner,
  image,
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
} = actions

const mapDispatchToProps = dispatch => bindActionCreators({
  showUserInfo,
  showNotification,
  showHistoryDonut,
  hideUserInfo,
  hideNotification,
  hideHistoryDonut,
  channelCreate,
  notificationReadMark,
  setReadNotificationIds,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarRight extends Component {
  static propTypes = {

  }

  display() {

    const {
      rightbar,
      channelCreate,
      channels,
      notifications,
      setReadNotificationIds,
      notificationReadMark,
      donutsHistory,
      showHistoryDonut,
    } = this.props

    const { displayType, isOpen, userInfo, channelUsers } = rightbar

    const { all: allChannels } = channels
    const { all: allNotifications } = notifications

    switch(displayType) {
      case 'UserInfo': {
        return (
          <SidebarRightUserInfo
            user={userInfo}
            channels={allChannels}
            channelCreate={channelCreate}
          />
        )
      }

      case 'ChannelUsers': {
        return (
          <SidebarRightChannelUsers
            channelUsers={channelUsers}
          />
        )
      }

      case 'Notification': {
        return (
          <SidebarRightNotification
            allNotifications={allNotifications}
            notificationReadMark={notificationReadMark}
          />
        )
      }

      case 'Donuts': {
        return (
          <SidebarRightHistoryDonuts
            donutsHistory={donutsHistory}
          />
        )
      }
    }
  }

  render() {
    const { displayType, isOpen, userInfo } = this.props.rightbar
    const { channelCreate, channels, showHistoryDonut, hideSidebarRight, donutsHistory } = this.props
    const { all: allChannels } = channels
    const userImages = [...new Set(donutsHistory.map(history => history.fromUser.image.mediumUrl))].slice(0, 3)
    return (
      <div>
        { isOpen ? (
          <aside className={wrapper}>
            <div className={close} onClick={() => hideSidebarRight()}></div>
            {this.display()}
          </aside>
        ) : null }
        { !isOpen &&
        <div className={btnDonutsHistory}>
          <div className={btnDonutsHistoryInner}>
            {userImages && userImages.map((imageUrl, index) => {
              return (
                <div className={image} data-image-id={index+1}>
                  <img src={imageUrl} alt="" />
                </div>
              )
            })}
            <button className={btn} onClick={() => showHistoryDonut()}>open</button>
          </div>
        </div>
        }
     </div>
    )
  }
}
