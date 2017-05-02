import React, { Component, PropTypes } from 'react'

import {
  InputSearchSchool,
  InputTextTransparent,
  Button,
} from '../../../index'

import {
  layoutSelectSchool,
  layoutUserInfo,
  layoutSelectSchoolHeader,
  layoutSelectSchoolContent,
  layoutSelectSchoolTitle,
  layoutSelectSchoolFotter,
  input,
} from './style'

export default class Signup extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired
  }

  constructor() {
    super()
    this.state = {
      pageIndex: 0,
      form: {
        school: null,
      },
    }
  }

  onClick() {
    this.setState({
      pageIndex: this.state.pageIndex + 1
    })
  }

  onSelectSchool(school) {
    this.setState({
      pageIndex: 1,
      form: {
        school: school,
      },
    })
  }

  onSubmit() {
    const { userCreate } = this.props
    const { email, firstName, lastName, password, school } = this.state.form
    userCreate({name: `${firstName} ${lastName}`, email: email, password: password, schoolId: 1})
  }

  get renderFirstPage() {
    return (
      <div className={layoutSelectSchool}>
        <div className={layoutSelectSchoolHeader}>
          <h2 className={layoutSelectSchoolTitle}>Yo. What is your campus?</h2>
        </div>
        <div className={layoutSelectSchoolContent}>
          <InputSearchSchool {...this.props} onSelectSchool={::this.onSelectSchool} />
        </div>
        <div className={layoutSelectSchoolFotter}>
        </div>
      </div>
    )
  }

  get renderSecondPage() {
    return (
      <div className={layoutUserInfo}>
        <h1>{this.state.form.school.name}? Great, here we go!</h1>
        <InputTextTransparent
          className={input}
          onChange={event => this.setState({ form: { ...this.state.form, firstName: event.target.value } })}
          placeholder="First Name"
        />

        <InputTextTransparent
          className={input}
          onChange={event => this.setState({ form: { ...this.state.form, lastName: event.target.value } })}
          placeholder="Last Name"
        />

        <InputTextTransparent
          className={input}
          onChange={event => this.setState({ form: { ...this.state.form, email: event.target.value } })}
          placeholder="Email"
        />

        <InputTextTransparent
          type="password"
          className={input}
          onChange={event => this.setState({ form: { ...this.state.form, password: event.target.value } })}
          placeholder="Password"
        />
        <div className={layoutSelectSchoolFotter}>
          <Button onClick={::this.onSubmit} type="primary">Sign Up</Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.pageIndex === 0 ? this.renderFirstPage : this.renderSecondPage}
      </div>
    )
  }
}
