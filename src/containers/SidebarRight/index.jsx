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
} from './style'

import {
  SidebarRightHistoryDonuts,
  SidebarRightNotification,
  SidebarRightUserInfo,
  SidebarRightChannelUsers,
} from '../../components'

import uiAction from '../../redux/actions'

const mapStateToProps = state => ({
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
    const { displayType, isOpen, userInfo, channelUsers } = this.props.rightbar
    const { channelCreate, channels, notifications, setReadNotificationIds, notificationReadMark } = this.props
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
    }
  }

  render() {
    const { displayType, isOpen, userInfo } = this.props.rightbar
    const { channelCreate, channels } = this.props
    const { all: allChannels } = channels
    return (
      <div>
        { isOpen ? (
          <aside className={wrapper}>
            <div className={close} onClick={() => this.props.hideSidebarRight()}></div>
            {this.display()}
          </aside>
        ) : null }
     </div>
    )
  }
}
