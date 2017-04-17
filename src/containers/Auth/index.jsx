/* @flow */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'

import {
  LayoutAuth,
} from '../../components'

import {
  error,
} from './style'

const mapStateToProps = state => ({
  schools: state.schools,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  schoolsSearch: actions.schoolsSearch,
  logIn: actions.logIn,
  userCreate: actions.userCreate,
  hashtagAdd: actions.hashtagAdd,
  userPictureUpdate: actions.userPictureUpdate,
  authClearError: actions.authClearError,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Auth extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    schools: PropTypes.object.isRequired,
    schoolsSearch: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
    userCreate: PropTypes.func.isRequired,
    hashtagAdd: PropTypes.func.isRequired,
    userPictureUpdate: PropTypes.func.isRequired,
    authClearError: PropTypes.func.isRequired,
  }

  renderError() {
    const { auth } = this.props

    let errorMessage = 'Error'

    if (!auth.error || typeof auth.error.response === 'undefined') {
      return null
    }

    if (auth.error.response.data.error === 'invalid_grant') {
      errorMessage = 'Please check your email address or password'
    }

    if (auth.error.response.data.error.code === 'CreateNewUserError.InvalidUserInfo') {
      errorMessage = auth.error.response.data.error.message
    }

    return (
      // TODO: Should change div to interactive elements. - Kei
      <div className={error} onClick={this.props.authClearError}>
        {errorMessage}
      </div>
    )
  }

  render() {
    const {
      auth,
      children,
      schools,
      schoolsSearch,
      logIn,
      userCreate,
      hashtagAdd,
      userPictureUpdate,
    } = this.props

    const childComponents = React.Children.map(children, child => React.cloneElement(child, {
      auth,
      schools,
      schoolsSearch,
      logIn,
      userCreate,
      hashtagAdd,
      userPictureUpdate,
    }))

    return (
      <LayoutAuth>
        {this.renderError()}
        <div>{childComponents}</div>
      </LayoutAuth>
    )
  }
}
