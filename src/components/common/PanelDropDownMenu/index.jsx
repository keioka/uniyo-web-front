import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  ButtonClose,
} from '../../'

import {
  element,
  elementActive,
  elementItem,
} from './style.scss'

// import Plus from './plus'

class PanelDropDownMenu extends Component {

  constructor() {
    super()
    this.onClickWindow = this.onClickWindow.bind(this)
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

  componentDidMount() {
    const self = this
    document.getElementById("content").addEventListener('click', self.onClickWindow, false)
  }

  componentWillUnmount() {
    const self = this
    document.getElementById("content").removeEventListener('click', self.onClickWindow, false)
  }

  render() {
    const {
      className,
      items,
      isDisplay,
    } = this.props
    const panelClassName = isDisplay ? `${className} ${element} ${elementActive}` : `${className} ${element}`
    return (
      <ul className={panelClassName} ref={(ref) => this._panel = ref }>
        {items.map(item => <li className={elementItem} onClick={item.action}>{item.title}</li>)}
      </ul>
    )
  }
}

PanelDropDownMenu.defaultProps = {
  type: 'success'
}

export default PanelDropDownMenu
