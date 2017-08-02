/* @flow */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../../redux/actions'
import { bindActionCreators } from 'redux'

import Setting from './settings.svg'
import Notification from './notification.svg'

import {
  Tooltip,
  PanelDropDownSetting,
  NavPostType,
  NavChannel,
  NavDonuts,
} from '../../index'

import {
  header,
  headerNavBasic,
  wrapperIcon,
  icon,
  notification,
} from './style'

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.api.auth.currentUser,
    allUsers: state.api.users.all,
    allChannels: state.api.channels.all,
    uiStateHeader: state.ui.header,
    unreadNotification: state.api.notifications.all.filter(notification => !notification.isRead).length,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  messageSearch: actions.messageSearch,
  messageCreate: actions.messageCreate,
  showUserInfo: uiActions.showUserInfo,
  showChannelUsers: uiActions.showChannelUsers,
  showNotification: uiActions.showNotification,
  showHistoryDonut: uiActions.showHistoryDonut,
  signout: actions.signout,
  donutsShake: uiActions.donutsShake,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends Component {

  state = {
    isOpenSettingMenu: false
  }

  render() {
    const {
      allUsers,
      allChannels,
      unreadNotification,
      uiStateHeader,
      onSelectPostType,
      isQuestionDashboard,
      hashtag,
      currentPostType,
      donutsShake,
      showUserInfo,
      showChannelUsers,
      showNotification,
      showHistoryDonut,
      currentUser,
      signout,
      location,
      router,
    } = this.props

    const { isReceiveDonuts, isSpentDonuts } = uiStateHeader

    const regex = new RegExp(/\/dashboard\/channels\/\d+/)
    const path = location.pathname

    let isChannel = false
    let channel
    let channelUsers

    if (path.match(regex)) {
      isChannel = true
      const { channelId } = router.params
      channel = allChannels.filter(channel => channel.id == channelId)[0]
      channelUsers = isChannel && channel && channel.users.map(userId => allUsers.filter(user => user.id === userId)[0])
      if (!channel) {
        //redirect
      }
    }
    return (
      <header className={header}>
        <div className={headerNavBasic}>
          <Tooltip text="Show notifications" classNameWrapper={wrapperIcon}>
          { unreadNotification &&
            unreadNotification.length > 0 ?
            <span className={notification} data-for='notification' data-tip="hello world"  onClick={() => showNotification()}>
              {unreadNotification.length}
            </span> :
            <Notification className={icon} onClick={() => showNotification()} />
          }
          </Tooltip>
          <Tooltip text="Show settings" classNameWrapper={wrapperIcon}>
            <Setting className={icon} onClick={() => this.setState({ isOpenSettingMenu: !this.state.isOpenSettingMenu })} />
          </Tooltip>
          { this.state.isOpenSettingMenu &&
            <PanelDropDownSetting
              closePanel={() => this.setState({ isOpenSettingMenu: false })}
              signout={signout}
              showUserInfo={() => showUserInfo(currentUser.id)}
            />
          }
        </div>
        {!isChannel ?
          <NavPostType
            onSelectPostType={onSelectPostType}
            currentPostType={isQuestionDashboard ? TYPES['questions']: currentPostType}
            currentHashTag={hashtag}
          /> :
          <NavChannel
            channel={channel}
            channelUsers={channelUsers}
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
    )
  }
}

Header.PropTypes = {

}
