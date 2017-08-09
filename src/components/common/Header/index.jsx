/* @flow */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'

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

const TYPES = {
  docs: 'CLASS_NOTE',
  post: 'POST',
  reviews: 'REVIEW',
  questions: 'QUESTION',
  all: 'ALL',
}

const mapStateToProps = (state, ownProps) => {
  return {
    availableDonutsCount: state.api.auth.currentUser.availableDonutsCount,
    receivedDonutsCount: state.api.auth.currentUser.receivedDonutsCount,
    currentUserId: state.api.auth.currentUser.id,
    allUsers: state.api.users.all,
    allChannels: state.api.channels.all,
    unreadNotification: state.api.notifications.all.filter(notification => !notification.isRead),
    isReceiveDonuts: state.ui.header.isReceiveDonuts,
    isSpentDonuts: state.ui.header.isSpentDonuts,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  messageSearch: actions.messageSearch,
  messageCreate: actions.messageCreate,
  showUserInfo: uiActions.showUserInfo,
  showChannelUsers: uiActions.showChannelUsers,
  showNotification: uiActions.showNotification,
  showHistoryDonut: uiActions.showHistoryDonut,
  signout: uiActions.signout,
  donutsShake: uiActions.donutsShake,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends Component {

  state = {
    isOpenSettingMenu: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('nextProps', nextProps)
    // console.log('this.props', this.props)
    //
    // console.log('nextProps', nextProps.allMessages.length)
    // console.log('this.props', this.props.allMessages.length)

    if (this.props.router.params.channelId !== nextProps.router.params.channelId) {
      return true
    }
    if (
      this.props.availableDonutsCount !== nextProps.availableDonutsCount ||
      this.props.receivedDonutsCount !== nextProps.receivedDonutsCount ||
      this.props.unreadNotification.length !== nextProps.unreadNotification.length ||
      this.props.allUsers.length !== nextProps.allUsers.length ||
      shallowCompare(this, this.props.allUsers, nextProps.allUsers) ||
      this.props.allChannels.length !== nextProps.allChannels.length ||
      this.props.isReceiveDonuts !== nextProps.isSpentDonuts ||
      this.props.isSpentDonuts !== nextProps.isSpentDonuts ||
      this.props.currentPostType !== nextProps.currentPostType ||
      this.props.location.pathname !== nextProps.location.pathname ||
      this.state.isOpenSettingMenu !== nextState.isOpenSettingMenu
    ) {
      return true
    }
    return false
  }

  render() {
    const {
      allUsers,
      allChannels,
      unreadNotification,
      isReceiveDonuts,
      isSpentDonuts,
      onSelectPostType,
      isQuestionDashboard,
      hashtag,
      currentPostType,
      donutsShake,
      showUserInfo,
      showChannelUsers,
      showNotification,
      showHistoryDonut,
      signout,
      location,
      router,
      availableDonutsCount,
      receivedDonutsCount,
      currentUserId,
    } = this.props

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
              showUserInfo={() => showUserInfo(currentUserId)}
            />
          }
        </div>
        {!isChannel ?
          <NavPostType
            onSelectPostType={onSelectPostType}
            currentPostType={isQuestionDashboard ? TYPES['questions'] : currentPostType}
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
          availableDonutsCount={availableDonutsCount}
          receivedDonutsCount={receivedDonutsCount}
        />
      </header>
    )
  }
}

Header.PropTypes = {

}
