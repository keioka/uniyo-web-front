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
  layoutSelectSchoolFotterLeft,
  layoutSelectSchoolFotterRight,
  input,
} from './style.scss'

export default class SelectSchool extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired,
  }

  onSelectSchool(school) {
    const { pathname } = this.props.location
    if (school && pathname === '/signin') {
      browserHistory.push(`/schools/${school.slug}/signin`)
    } else if (school && pathname === '/signup') {
      browserHistory.push(`/schools/${school.slug}/signup`)
    }
  }

  render() {
    return (
      <div className={layoutSelectSchool}>
        <div className={layoutSelectSchoolHeader}>
          <h2 className={layoutSelectSchoolTitle}>Which school do you go to?</h2>
        </div>
        <div className={layoutSelectSchoolContent}>
          <InputSearchSchool
            {...this.props}
            onSelectSchool={::this.onSelectSchool}
          />
        </div>
        <div className={layoutSelectSchoolFotter}>
          <img src="/public/assets/images/auth/donuts_left.svg" alt=""/>
          <img src="/public/assets/images/auth/donuts_right.svg" alt=""/>
        </div>
      </div>
    )
  }
}
