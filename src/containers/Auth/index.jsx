/* @flow */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { actions } from 'uniyo-redux'

import {
  LayoutAuth
} from '../../components'

console.log(actions)

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
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Auth extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    schools: PropTypes.object.isRequired,
    schoolsSearch: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
  }

  render() {

    const {
      children,
      schools,
      schoolsSearch,
      logIn,
      userCreate,
      hashtagAdd,
      userPictureUpdate,
    } = this.props

    const childComponents = React.Children.map(children, child => React.cloneElement(child, {
      schools,
      schoolsSearch,
      logIn,
      userCreate,
      hashtagAdd,
      userPictureUpdate,
    }))

    return (
      <LayoutAuth>
        <div>{childComponents}</div>
      </LayoutAuth>
    )
  }
}
