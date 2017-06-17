/* @flow */

import React, { PureComponent, PropTypes } from 'react'

import {
  Donut,
} from '../../'

import {
  element,
} from './style'

type Props = {
  className: String,
  donutsCount: Number,
  onClick: Function,
};

export default class ButtonDonuts extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    donutsCount: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    donutsCount: 0,
  }

  shouldComponentUpdate(nextProps: Props) {
    return !(nextProps.donutsCount === this.props.donutsCount)
  }

  onClick(event) {
    event.stopPropagation()
    event.preventDefault()
    this.props.onClick()
  }

  render() {
    const { className, donutsCount } = this.props
    const classNames:string = `${element} ${className}`
    return (
      <button
        className={classNames}
        data-role="give-donuts"
        data-count={donutsCount}
        onClick={::this.onClick}
      >
        <Donut size="xs" count={donutsCount} />
      </button>
    )
  }
}
