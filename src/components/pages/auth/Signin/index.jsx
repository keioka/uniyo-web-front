import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
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

export default class Signin extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired,
  }

  constructor() {
    super()
    this.state = {
      form: {
        email: '',
        password: '',
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
      browserHistory.push(`/signin`)
    }
    const { logIn } = this.props
    const { email, password } = this.state.form
    const schoolId = isDemo ? 1 : selectedSchool.id
    logIn({ username: email, password, schoolId })
  }

  render() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    const schools = this.props.schools.data.filter(school => school.slug === this.props.params.schoolSlug)
    const selectedSchool = schools.length > 0 && schools[0]

    return (
      <div>
        <div className={layoutUserInfo}>
          <div className={layoutSelectSchoolHeader}>
            <h2 className={layoutSelectSchoolTitle}>{isDemo ? "Demo" : selectedSchool.name}? Great, here we go!😜</h2>
          </div>
          <div className={layoutSelectSchoolContent}>

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
          </div>
          <div className={layoutSelectSchoolFotter}>
            <Button onClick={::this.onSubmit} type="primary">Sign in</Button>
          </div>
        </div>
      </div>
    )
  }
}
