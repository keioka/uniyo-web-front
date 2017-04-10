import React, { Component, PropTypes } from 'react'

export default class Auth extends Component {

  static propTypes = {}

  render() {
    return (
      <div>
        <div>Auth</div>
        <div>{this.props.children}</div>
      </div>
    )
  }
}
