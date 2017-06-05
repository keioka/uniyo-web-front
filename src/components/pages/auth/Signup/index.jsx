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

    componentDidMount() {
      const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
      if (!isDemo && this.props.schools.data.filter(school => school.slag === this.props.params.schoolSlug).length === 0) {
        this.props.schoolInfo({
          id: this.props.params.schoolSlug,
        })
      }
    }

  onSubmit() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    const schools = this.props.schools.data.filter(school => school.slag === this.props.params.schoolSlug)
    const selectedSchool = schools.length > 0 && schools[0]
    if (!isDemo && !selectedSchool) {
      browserHistory.push(`/signup`)
    }

    const { userCreate } = this.props
    const { email, firstName, lastName, password } = this.state.form
    const schoolId = isDemo ? 1 : selectedSchool.id
    userCreate({ firstName, lastName, email, password, schoolId })
  }

  render() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    const schools = this.props.schools.data.filter(school => school.slug === this.props.params.schoolSlug)
    const selectedSchool = schools.length > 0 && schools[0]
    return (
      <div className={layoutUserInfo}>
        <h1>{selectedSchool.name}? Great, here we go!</h1>
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
}
