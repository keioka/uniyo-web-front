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
  box,
  active,
} from './style'

export default class Signin extends Component {

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

    if (!window.talkus) {
      window.talkus('init', 'mAuzzo8t2j9Bih5qy')
    }
  }

  onSubmit() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    const schools = this.props.schools.data.filter(school => school.slug === this.props.params.schoolSlug)
    const selectedSchool = schools.length > 0 ? schools[0] : null
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
      <div className={layoutUserInfo}>
        <div className={header}>
          <nav className={nav}>
            <ul className={ul}>
              <li className={active}>log in</li>
              <li>
                <Link to={`/schools/${selectedSchool.slug ? selectedSchool.slug : 'demo'}/signup`}>sign up</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={content}>
          <h2 className={contentTitle}>Welcome back! 😜</h2>
          <div className={contentMain}>
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
          <div className={contentFooter}>
            <Button onClick={::this.onSubmit} type="primary" className={btn}>Log in</Button>
            <div className={box}>
              <span className={text}>You are logging in to <b><Link to="/signin">{isDemo ? "Demo" : selectedSchool.name}</Link></b>.<br/>Forgot your password? <b><Link to={`/schools/${selectedSchool.slug ? selectedSchool.slug : 'demo'}/reset_password`}>Click on this link</Link></b>.</span>
            </div>
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
