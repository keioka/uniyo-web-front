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
  box,
  boxNames,
  btn,
  header,
  nav,
  ul,
  text,
  active,
  content,
  title,
  layoutSelectSchoolFotter,
  layoutSelectSchoolFotterLeft,
  layoutSelectSchoolFotterRight,
  input,
  inputName,
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
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      },
    }
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
        <div className={header}>
          <nav className={nav}>
            <ul className={ul}>
              <li>
                {selectedSchool ?
                  <Link to={`/schools/${selectedSchool.slug}/signin`}>Log in</Link> :
                  <Link to="/signup">sign up</Link>
                }
              </li>
              <li className={active}>sign up</li>
            </ul>
          </nav>
        </div>
        <div className={content}>
          <h2 className={title}>Here we go! 😜</h2>
          <div className={boxNames}>
            <InputTextTransparent
              className={inputName}
              onChange={event => this.setState({ form: { ...this.state.form, firstName: event.target.value } })}
              placeholder="First Name"
            />

            <InputTextTransparent
              className={inputName}
              onChange={event => this.setState({ form: { ...this.state.form, lastName: event.target.value } })}
              placeholder="Last Name"
            />

          </div>

          <InputTextTransparent
            className={input}
            onChange={event => this.setState({ form: { ...this.state.form, email: event.target.value } })}
            placeholder="name@email.com"
          />

          <InputTextTransparent
            type="password"
            className={input}
            onChange={event => this.setState({ form: { ...this.state.form, password: event.target.value } })}
            placeholder="Password"
          />
          <Button onClick={::this.onSubmit} type="primary" className={btn}>Sign Up</Button>
          <div className={box}>
            <span className={text}>You are signing up to <b><Link to="/signin">{isDemo ? "Demo" : selectedSchool.name}</Link></b>. Before joining, read the <b><Link to="/terms">Uniyo terms</Link></b> and our <b><Link to="/privacy">privacy policy</Link></b>.</span>
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
