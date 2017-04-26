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
} from './style'

import uiAction from '../../redux/actions'

const mapStateToProps = state => ({
  rightbar: state.ui.rightbar,
})

const {
  showUserInfo,
  showNotification,
  showHistoryDonut,
  hideUserInfo,
  hideNotification,
  hideHistoryDonut,
} = uiAction

const mapDispatchToProps = dispatch => bindActionCreators({
  showUserInfo,
  showNotification,
  showHistoryDonut,
  hideUserInfo,
  hideNotification,
  hideHistoryDonut,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarRight extends Component {
  static propTypes = {

  }

  get userInfo() {
    return (
      <div className={userInfo}>

      </div>
    )
  }

  get notification() {
    return (
      <div className={notification}>
        notification
      </div>
    )
  }

  get historyDonut() {
    return (
      <div className={historyDonut}>
        history
      </div>
    )
  }

  render() {
    const { displayType } = this.props.rightbar
    console.log(displayType)

    return (
      <aside className={wrapper}>
        {this.userInfo}
        {this.notification}
        {this.historyDonut}

      </aside>
    )
  }
}
