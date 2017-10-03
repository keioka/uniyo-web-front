import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uiActions from '../../../redux/actions'

import 'style-loader!css-loader!emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import {
  element,
} from './style.scss'

const findParentNode = (parentName, childObj) => {
  let testObj = childObj.parentNode
  while(testObj != parentName) {
    if(!testObj) {
      return false
    }
    testObj = testObj.parentNode
  }
  return true
}

const isElementOnPanel = findParentNode


class PanelEmoji extends Component {

  constructor() {
    super()
    this.onClickWindow = this.onClickWindow.bind(this)
    this.onPressEscKey = this.onPressEscKey.bind(this)
  }

  componentDidMount() {
    const self = this
    document.getElementById("content").addEventListener('click', self.onClickWindow, false)
    document.addEventListener('keydown', self.onPressEscKey)
  }

  onPressEscKey(event) {
    if (event.keyCode == 27) {
      this.props.closePanel()
    }
  }

  componentWillUnmount() {
    const self = this
    document.getElementById("content").removeEventListener('click', self.onClickWindow, false)
    document.removeEventListener('keydown', self.onPressEscKey, false)
  }

  onClickWindow(event) {
    if (!isElementOnPanel(this._panel, event.target)) {
      this.props.closePanel()
    }
  }

  render() {
    return (
      <div className={element} ref={(ref) => this._panel = ref}>
        <Picker
          onClick={this.props.onClickEmoji}
          style={{ position: 'absolute', right: '0px' }}
          emojiSize={25}
          perLine={9}
          skin={1}
          set='apple'
          autoFocus={false}
        />
      </div>
    )
  }
}

export default PanelEmoji
