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
} from '../../components'

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

  onClickCloseButtonHandler() {

  }

  render() {
    const { displayType, isOpen, userInfo } = this.props.rightbar

    return (
      <div>
        { isOpen ? (
          <aside className={wrapper}>
            <div className={close} onClick={() => this.props.hideSidebarRight()}></div>
            <SidebarRightUserInfo user={userInfo} />
          </aside>
        ) : null }
     </div>
    )
  }
}
