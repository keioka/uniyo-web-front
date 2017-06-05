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

export default class SelectSchool extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired,
  }

  onSelectSchool(school) {
    if (school) {
      browserHistory.push(`/schools/${school.slug}/signin`)
    }
  }

  render() {
    return (
      <div className={layoutSelectSchool}>
        <div className={layoutSelectSchoolHeader}>
          <h2 className={layoutSelectSchoolTitle}>Yo. What is your campus?</h2>
        </div>
        <div className={layoutSelectSchoolContent}>
          <InputSearchSchool
            {...this.props}
            onSelectSchool={::this.onSelectSchool}
          />
        </div>
        <div className={layoutSelectSchoolFotter}>
        </div>
      </div>
    )
  }
}
