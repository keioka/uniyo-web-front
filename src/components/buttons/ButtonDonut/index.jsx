import React, { PureComponent, PropTypes } from 'react'

import {
  Donut,
} from '../../'

import {
  element,
} from './style'

export default class ButtonDonuts extends PureComponent {

  shouldComponentUpdate(nextProps) {
    if (nextProps.donutsCount === this.props.donutsCount) {
      return false
    }

    return true
  }

  onClick(event) {
    event.stopPropagation()
    event.preventDefault()
    this.props.onClick()
  }

  render() {
    const { className, donutsCount, onClick } = this.props
    const classNames = `${element} ${className}`
    return (
      <button
        className={classNames}
        data-role='give-donuts'
        data-count={donutsCount}
        onClick={::this.onClick}
      >
        <Donut size="xs" />
      </button>
    )
  }
}
