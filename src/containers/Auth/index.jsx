/* @flow */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../redux/actions'
import { Link } from 'react-router'

import {
  LayoutAuth,
  BarAuthMessage,
} from '../../components'

import {
  error,
  success,
  link,
  message,
} from './style'

const mapStateToProps = state => ({
  schools: state.api.schools,
  auth: state.api.auth,
  hashtags: state.api.hashtags,
  formProfile: state.form.profile,
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
  setUploadedImageTooLarge: uiActions.setUploadedImageTooLarge,
  clearUploadedImageTooLarge: uiActions.clearUploadedImageTooLarge,
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

  componentDidMount() {
    // if (window.talkus) {
    //   window.talkus('hide')
    // }
    if (window.talkus && document.getElementsByClassName('talkus-body')[0]) {
      // window.talkus('hide')
      document.getElementsByClassName('talkus-body')[0].style.display = 'none'
    }
  }

  renderSuccess() {
    const { auth, authClearError } = this.props
    let message
    if (auth.isResetSuccess) {
      message = 'Sent email to you. Please check your email 😄'
    }

    if (auth.isUpdateNewPasswordSuccess) {
      message = 'Now you have new password! 😋'
    }

    return (
      <div>
        { message &&
          <BarAuthMessage onClick={authClearError}>
            {message}
          </BarAuthMessage>
        }
      </div>
    )
  }

  renderError() {

    const { auth, formProfile, clearUploadedImageTooLarge } = this.props

    let errorMessage = 'Error'
    if (formProfile.isUploadedImageTooLarge) {
      return (
        // TODO: Should change div to interactive elements. - Kei
        <BarAuthMessage type="error" onClick={clearUploadedImageTooLarge}>
          🙉&nbsp; Maximum image size is 5MB
        </BarAuthMessage>
      )

    }

    if (!auth.error || typeof auth.error.response === 'undefined') {
      return null
    }

    if (auth.error.response.data.error === 'invalid_request') {
      errorMessage = (
        <span>
          <span className={message}>🙈&nbsp; Type email and password</span>
        </span>
      )
    }

    if (auth.error.response.data.error === 'invalid_grant') {
      const { schoolSlug } = this.props.params
      errorMessage = (
        <span>
          <span className={message}>👀&nbsp; Check your email and password or </span>
          <Link to={schoolSlug ? `/schools/${schoolSlug}/signup` : 'signup' } className={link}>try to sign up</Link>
        </span>
      )
    }

    if (
      auth.error.response.data.error.code === 'CreateNewUserError.InvalidUserInfo'
    ) {
      if (auth.error.response.data.error.message === 'Invalid first name') {
        errorMessage = 'Even a cat knows his first name\xa0🙀'
      }

      if (auth.error.response.data.error.message === 'Invalid last name') {
        errorMessage = '🙏\xa0 Please, your last name??'
      }

      if (auth.error.response.data.error.message === 'Invalid email format.') {
        errorMessage = '👀\xa0 Your email looks super weird'
      }

      if (auth.error.response.data.error.message === 'Password cannot be empty') {
        errorMessage = '🙈\xa0 Type a password'
      }
    }

    if (
      auth.error.response.data.error.code === 'CreateNewUserError.EmailAlreadyExists'
    ) {

      const { schoolSlug } = this.props.params
      errorMessage = (
        <span>
          <span className={message}>👋&nbsp; Hey! Someone already signed up with this email. </span>
          <Link to={schoolSlug ? `/schools/${schoolSlug}/signin` : 'signin' } className={link}>Log in page</Link>
        </span>
      )
    }

    if (
      auth.error.response.data.error.code === 'ResetPasswordError.InvalidToken'
    ) {
      errorMessage = 'Token is expired or invalid. Please send another reset password request'
    }

    return (
      // TODO: Should change div to interactive elements. - Kei
      <BarAuthMessage type="error" onClick={this.props.authClearError}>
        {errorMessage}
      </BarAuthMessage>
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
      setUploadedImageTooLarge,
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
      setUploadedImageTooLarge,
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
