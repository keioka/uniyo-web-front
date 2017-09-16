import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import {
  InputSearchSchool,
  InputTextTransparent,
  Button,
} from '../../../index'

import {
  layoutSelectSchool,
  layoutUserInfo,
  header,
  title,
  content,
  contentTitle,
  contentMain,
  contentFooter,
  layoutSelectSchoolFotter,
  layoutSelectSchoolFotterLeft,
  layoutSelectSchoolFotterRight,
  input,
  btn,
  text,
  nav,
  ul,
  active,
} from './style'

export default class NewPassword extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired,
  }

  state = {
    form: {
      password: '',
      passwordConfirmation: '',
    },
  }

  componentDidMount() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    if (!isDemo && this.props.schools.data.filter(school => school.slug === this.props.params.schoolSlug).length === 0) {
      this.props.schoolInfo({
        id: this.props.params.schoolSlug,
      })
    }
  }

  onSubmit() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    const schools = this.props.schools.data.filter(school => school.slug === this.props.params.schoolSlug)
    const selectedSchool = schools.length > 0 && schools[0]
    if (!isDemo && !selectedSchool) {
      browserHistory.push(`/signin`)
    }
    const { newPasswordUpdate, params } = this.props
    const { token } = params

    const { password, passwordConfirmation } = this.state.form
    const schoolId = isDemo ? 1 : selectedSchool.id
    newPasswordUpdate({ password, passwordConfirmation, token })
  }

  render() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    const schools = this.props.schools.data.filter(school => school.slug === this.props.params.schoolSlug)
    const selectedSchool = schools.length > 0 && schools[0]
    const { auth } = this.props
    return (
      <div className={layoutUserInfo}>
        <div className={header}>
          <nav className={nav}>
            <ul className={ul}>
              <li>
                <Link to={`/schools/${selectedSchool.slug ? selectedSchool.slug : 'demo'}/signin`}>Log in</Link>
              </li>
              <li>
                <Link to={`/schools/${selectedSchool.slug ? selectedSchool.slug : 'demo'}/signup`}>sign up</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={content}>
          <h2 className={contentTitle}>Pick a new password 🙈</h2>
          <div className={contentMain}>
            <InputTextTransparent
              type="password"
              className={input}
              onChange={event => this.setState({ form: { ...this.state.form, password: event.target.value } })}
              placeholder="Your new password"
            />
            <InputTextTransparent
              type="password"
              className={input}
              onChange={event => this.setState({ form: { ...this.state.form, passwordConfirmation: event.target.value } })}
              placeholder="Confirm your Password"
            />
          </div>
          <div className={contentFooter}>
            <Button onClick={::this.onSubmit} type="primary" className={btn}>Reset password</Button>
            <span className={text}>Want to log in instead? <b><Link to={`/schools/${selectedSchool.slug}/signin`}>Click here</Link></b></span>
          </div>
        </div>

        <div className={layoutSelectSchoolFotter}>
          <img src="/public/assets/images/auth/donuts_left.svg" alt=""/>
          <img src="/public/assets/images/auth/donuts_right.svg" alt=""/>
        </div>
      </div>
    )
  }
}
