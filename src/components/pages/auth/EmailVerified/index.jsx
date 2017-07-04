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

export default class EmailVerified extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired,
  }


  componentDidMount() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    if (!isDemo && this.props.schools.data.filter(school => school.slug === this.props.params.schoolSlug).length === 0) {
      this.props.schoolInfo({
        id: this.props.params.schoolSlug,
      })
    }
  }

  render() {
    const isDemo = this.props.params.schoolSlug === 'demo' ? true : false
    const schools = this.props.schools.data.filter(school => school.slug === this.props.params.schoolSlug)
    const selectedSchool = schools.length > 0 && schools[0]
    const { auth } = this.props
    const { isLogin } = auth
  
    return (
      <div className={layoutUserInfo}>
        <div className={header}>
          { !isLogin && <nav className={nav}>
            <ul className={ul}>
              <li>
                <Link to={`/schools/${selectedSchool.slug ? selectedSchool.slug : 'demo'}/signin`}>Log in</Link>
              </li>
              <li>
                <Link to={`/schools/${selectedSchool.slug ? selectedSchool.slug : 'demo'}/signup`}>sign up</Link>
              </li>
            </ul>
          </nav> }
        </div>
        <div className={content}>
          <h2 className={contentTitle}>👏 Your email looks good!</h2>
          <div className={contentMain}>

          </div>
          <div className={contentFooter}>
            {isLogin ? <Link to='/dashboard'><Button type="primary" className={btn}>Back Dashboard</Button></Link>: <Link to={`/schools/${selectedSchool.slug ? selectedSchool.slug : 'demo'}/signin`}><Button type="primary" className={btn}>Login</Button></Link> }
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
