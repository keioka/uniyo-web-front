/* @flow */

import React, { PureComponent, PropTypes } from 'react'

import {
  Donut,
} from '../../'

import {
  element,
  elementInner,
} from './style.scss'

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
    onClick: () => {},
    className: '',
    donutsCount: 0,
  }

  shouldComponentUpdate(nextProps:Props) {
    return !(nextProps.donutsCount === this.props.donutsCount)
  }

  onClick(event) {
    event.stopPropagation()
    event.preventDefault()
    this.props.onClick()
  }

  render() {
    const { className, donutsCount } = this.props
    const classNames:String = `${element} ${className}`
    return (
      <button
        className={classNames}
        onClick={::this.onClick}
      >
        {/* In order to use css 'flex' on Safari properly, need span tag */}
        <span
          className={elementInner}
          data-role="give-donuts"
          data-count={donutsCount}
        >
          <Donut size="xs" count={donutsCount} />
        </span>
      </button>
    )
  }
}
