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

  onSelectSchool(d) {
    this.setState({
      pageIndex: 1,
      form: {
        school: d,
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
      </div>
    )
  }

  get renderSecondPage() {
    return (
      <div className={layoutUserInfo}>
        <h1>{this.state.form.school.name}? Great, here we go!</h1>
        <InputTextTransparent
          className={input}
          onChange={value => this.setState({ form: { ...this.state.form, firstName: value } })}
          placeholder="First Name"
        />

        <InputTextTransparent
          className={input}
          onChange={value => this.setState({ form: { ...this.state.form, lastName: value } })}
          placeholder="Last Name"
        />

        <InputTextTransparent
          className={input}
          onChange={value => this.setState({ form: { ...this.state.form, email: value } })}
          placeholder="Email"
        />

        <InputTextTransparent
          type="password"
          className={input}
          onChange={value => this.setState({ form: { ...this.state.form, password: value } })}
          placeholder="Password"
        />

        <Button onClick={::this.onSubmit}>Submit</Button>
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
