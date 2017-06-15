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
      <div className={layoutUserInfo}>
        <div className={header}>
          <nav className={nav}>
            <ul className={ul}>
              <li className={active}>log in</li>
              <li>
                {selectedSchool ? <Link to={`/schools/${selectedSchool.slug}/signup`}>sign up</Link> : <Link to="/signup">sign up</Link>}
              </li>
            </ul>
          </nav>
        </div>
        <div className={content}>
          <h2 className={title}>Here we go! 😜</h2>
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
        <Button onClick={::this.onSubmit} type="primary" className={btn}>Log in</Button>
          <span className={text}>You are signing in to <b><Link to="/signin">{isDemo ? "Demo" : selectedSchool.name}</Link></b>.</span>
        </div>

        <div className={layoutSelectSchoolFotter}>
          <div className={layoutSelectSchoolFotterLeft}></div>
          <div className={layoutSelectSchoolFotterRight}></div>
        </div>
      </div>
    )
  }
}
