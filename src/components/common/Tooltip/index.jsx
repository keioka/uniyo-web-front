import React, { Component, PropTypes } from 'react'

import {
  element,
  wrapper,
  top,
  bottom,
  left,
  right,
} from './style'


export default class Tooltip extends Component {

  get position() {
    let className = []
    const { vertical, horizontal } = this.props
    switch(vertical) {
      case 'top':
        className.push(top)
        break
      case 'bottom':
        className.push(bottom)
        break
      default:
        className.push(bottom)
    }

    switch (horizontal) {
      case 'left':
        className.push(left)
        break
      case 'right':
        className.push(right)
        break
      default:
        className.push(left)
    }
    return className.join(' ')
  }

  render() {
    const { children, classNameElement, classNameWrapper, text } = this.props
    return (
      <div className={`${wrapper} ${classNameWrapper}`}>
        {children}
        <div className={`${element} ${classNameElement} ${this.position}`} data-role='tooltip'>{text}</div>
      </div>
    )
  }
}
