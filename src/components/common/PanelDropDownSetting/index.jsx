import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  ButtonClose,
} from '../../'

import {
  element,
  elementActive,
  elementItem,
} from './style'

// import Plus from './plus'

class PanelDropDownSetting extends Component {

  constructor() {
    super()
    this.onClickWindow = this.onClickWindow.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onClickWindow(event) {
    if (
      event.target.parentNode === this._panel ||
      event.target.parentNode.parentNode === this._panel ||
      event.target.parentNode.parentNode.parentNode === this._panel ||
      event.target.parentNode.parentNode.parentNode.parentNode === this._panel
    ) {
      return
    }
    this.props.closePanel()
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.props.closePanel()
    }
  }

  componentDidMount() {
    const self = this
    document.getElementById("content").addEventListener('click', self.onClickWindow, false)
    window.addEventListener('keydown', self.onKeyDown, false)
  }

  componentWillUnmount() {
    const self = this
    document.getElementById("content").removeEventListener('click', self.onClickWindow, false)
    window.removeEventListener('keydown', self.onKeyDown, false)
  }

  render() {
    const {
      className,
      items,
      isDisplay,
      showUserInfo,
      signout,
    } = this.props

    const onClickShowCurrentUserInfo = () => showUserInfo()
    const onClickSignout = () => signout()

    return (
      <div ref={ref => this._panel = ref} className={`${element} ${className}`}>
        <ul>
          <li onClick={onClickShowCurrentUserInfo}>Profile</li>
          <li onClick={onClickSignout}>Logout 👋</li>
        </ul>
      </div>
    )
  }
}

export default PanelDropDownSetting
