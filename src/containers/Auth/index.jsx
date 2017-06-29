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
  success,
} from './style'

const mapStateToProps = state => ({
  schools: state.api.schools,
  auth: state.api.auth,
  hashtags: state.api.hashtags,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  schoolsSearch: actions.schoolsSearch,
  schoolInfo: actions.schoolInfo,
  logIn: actions.logIn,
  userCreate: actions.userCreate,
  resetPassword: actions.resetPassword,
  newPasswordUpdate: actions.newPasswordUpdate,
  hashtagSearch: actions.hashtagSearch,
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
    resetPassword: PropTypes.func.isRequired,
    hashtags: PropTypes.object.isRequired,
  }

  renderSuccess() {
    const { auth, authClearError } = this.props
    let message
    if (auth.isResetSuccess) {
      message = 'Sent email to you. Please check your email'
    }

    if (auth.isUpdateNewPasswordSuccess) {
      message = 'Now you have password!'
    }

    return (
      <div>
        { message &&
          <div className={success} onClick={authClearError}>
            {message}
          </div>
        }
      </div>
    )
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

    if (
      auth.error.response.data.error.code === 'CreateNewUserError.InvalidUserInfo' ||
      auth.error.response.data.error.code === 'CreateNewUserError.EmailAlreadyExists'
    ) {
      errorMessage = auth.error.response.data.error.message
    }

    if (
      auth.error.response.data.error.code === 'ResetPasswordError.InvalidToken'
    ) {
      errorMessage = 'Token is expired or invalid. Please send another reset password request'
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
      schoolInfo,
      schoolsSearch,
      logIn,
      userCreate,
      hashtagAdd,
      userPictureUpdate,
      resetPassword,
      isResetSuccess,
      hashtags,
      hashtagSearch,
      newPasswordUpdate,
    } = this.props

    const childComponents = React.Children.map(children, child => React.cloneElement(child, {
      auth,
      schools,
      schoolInfo,
      schoolsSearch,
      logIn,
      userCreate,
      hashtagAdd,
      userPictureUpdate,
      resetPassword,
      isResetSuccess,
      hashtags,
      hashtagSearch,
      newPasswordUpdate,
    }))

    return (
      <LayoutAuth>
        {this.renderSuccess()}
        {this.renderError()}
        <div>{childComponents}</div>
      </LayoutAuth>
    )
  }
}
