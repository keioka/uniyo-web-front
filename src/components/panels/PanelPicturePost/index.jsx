import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uiActions from '../../../redux/actions'

import 'style-loader!css-loader!emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import {
  element,
} from './style'


class PanelPicturePost extends Component {

  constructor() {
    super()
    this.onClickWindow = this.onClickWindow.bind(this)
  }

  componentDidMount() {
    const self = this
    document.getElementById("content").addEventListener('click', self.onClickWindow, false)
  }

  componentWillUnmount() {
    const self = this
    document.getElementById("content").removeEventListener('click', self.onClickWindow, false)
  }

  onClickWindow(event) {
    event.stopPropagation()
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

  render() {
    return (
      <div className={element}>
        
      </div>
    )
  }
}

export default PanelPicturePost
