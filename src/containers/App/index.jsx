/* @flow */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { actions } from 'uniyo-redux'

import authService from '../../services/authentification'

import {
  app,
} from './style'


const mapStateToProps = state => ({
  auth: state.api.auth,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  tokenRefresh: actions.tokenRefresh,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  constructor() {
    super()
    this.state = {
      refreshIntervalId: null,
    }
  }

  componentWillMount() {
    // TODO: If token is still valid and launch application

    const { isLogin, fetching } = this.props.auth

    if (
      !authService.initialized &&
      authService.isTokenExist
    ) {
      // tokenRefresh is redux action in order to call api /oauth/token
      const { tokenRefresh } = this.props

      // if user is not login yet but has tokens, fetch user and refresh token
      authService.init(tokenRefresh, isLogin, fetching)

      //authService.tokenRefreshInterval() returns interval id
      const refreshIntervalId = authService.tokenRefreshInterval()

      this.setState({
        refreshIntervalId: refreshIntervalId,
      })
    }
  }

  componentDidMount() {
    if (authService.isTokenExist) {
      browserHistory.push('/dashboard')
    }
  }

  componentWillReceiveProps() {
    // If user just logined or signup
    const { isLogin, fetching } = this.props.auth

    if (
      !authService.initialized &&
      authService.isTokenExist &&
      !authService.refreshIntervalWorking
    ) {
      // tokenRefresh is redux action in order to call api /oauth/token
      const { tokenRefresh } = this.props
      authService.init(tokenRefresh, isLogin, fetching)

      //authService.tokenRefreshInterval() returns interval id
      const refreshIntervalId = authService.tokenRefreshInterval()

      this.setState({
        refreshIntervalId: refreshIntervalId,
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshIntervalId)
  }

  render() {
    return (
      <div id="app" className={app}>
        {this.props.children}
      </div>
    )
  }
}
