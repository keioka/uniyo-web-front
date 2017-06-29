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

export default class ResetPassword extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired,
  }

  state = {
    form: {
      email: '',
      password: '',
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
    const selectedSchool = schools.length > 0 ? schools[0] : null
    if (!isDemo && !selectedSchool) {
      browserHistory.push(`/signin`)
    }

    const { resetPassword } = this.props
    const { email, password } = this.state.form
    const schoolId = isDemo ? 1 : selectedSchool.id
    resetPassword({ email, schoolId })
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
          <h2 className={title}>We'll send you a magic link 🎩</h2>
          <InputTextTransparent
            className={input}
            onChange={event => this.setState({ form: { ...this.state.form, email: event.target.value } })}
            placeholder="Email"
          />
          <Button onClick={::this.onSubmit} type="primary" className={btn}>Send</Button>
          <span className={text}>Want to log in instead? <b><Link to={`/schools/${selectedSchool.slug}/signin`}>Click here</Link></b></span>
        </div>

        <div className={layoutSelectSchoolFotter}>
          <img src="/public/assets/images/auth/donuts_left.svg" alt=""/>
          <img src="/public/assets/images/auth/donuts_right.svg" alt=""/>
        </div>
      </div>
    )
  }
}
