import React, { Component, PropTypes } from 'react'

import {
  InputTextTransparent,
  Button,
} from '../../../index'

import {

} from './style'

export default class Profile extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired
  }

  constructor() {
    super()
    this.state = {
      pageIndex: 0,
      form: {
        photo: {},
        tagFavorite: []
        tagClass: [],
      },
    }
  }

  onClick() {
    this.setState({
      pageIndex: this.state.pageIndex + 1
    })
  }

  onSubmit() {
    const { logIn } = this.props
    const { email, password, school } = this.state.form
    logIn({username: email, password: password, schoolId: 1})
  }

  get renderFirstPage() {
    return (
      <div>
        <h2>What are your courses?</h2>
        <InputTextTransparent
          type="text"
          placeholder="What is your class"
        />
      </div>
    )
  }

  get renderSecondPage() {
    return (
      <div>
        <h2>What do you study?</h2>
        <div>
          <InputTextTransparent
            type="text"
            placeholder="What is your courses"
          />
        </div>
      </div>
    )
  }

  get renderThirdPage() {
    return (
      <div>
        <h2>Last step. Your profile picture! 😙</h2>
        <p>Profile</p>
        <p>Web cam</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>Signin</div>
        {this.state.pageIndex === 0 ? this.renderFirstPage : this.renderSecondPage}
      </div>
    )
  }
}
