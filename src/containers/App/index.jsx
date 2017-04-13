/* @flow */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { actions } from 'uniyo-redux'

import authService from '../../services/authentification'

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  tokenRefresh: actions.tokenRefresh,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  constructor() {
    super()
    this.state = {
      refreshIntervalId: null
    }
  }

  componentDidMount() {
    if (!authService.initialized) {
      const { tokenRefresh } = this.props
      authService.init(tokenRefresh)
      const refreshIntervalId = authService.tokenRefreshInterval()
      this.setState({
        refreshIntervalId: refreshIntervalId
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshIntervalId)
  }

  render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    )
  }
}
