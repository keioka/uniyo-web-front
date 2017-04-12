import React, { Component, PropTypes } from 'react'
import {
  InputSearchSchool,
} from '../../../index'

import {

} from './style'

export default class Signin extends Component {

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

  onClick() {
    this.setState({
      pageIndex: this.state.pageIndex + 1
    })
  }

  onSelectSchool(d) {
    this.setState({
      pageIndex: 1,
      form: {
        school: d,
      },
    })
  }

  onSubmit() {
    const { logIn } = this.props
    const { email, password, school } = this.state.form
    logIn({username: email, password: password, schoolId: 1})
  }

  get renderFirstPage() {
    return (
      <div>
        <div>1</div>
        <InputSearchSchool {...this.props} onSelectSchool={::this.onSelectSchool} />
      </div>
    )
  }

  get renderSecondPage() {
    return (
      <div>
        <div>2</div>
        <div>{this.state.form.school.name}</div>
        email: <input type="text" onChange={event => this.setState({ form: { ...this.state.form, email: event.target.value } })} />
        password: <input type="text" onChange={event => this.setState({ form: { ...this.state.form, password: event.target.value } })} />
        <button onClick={::this.onSubmit} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>Signin</div>
        {this.state.pageIndex === 0 ? this.renderFirstPage : this.renderSecondPage}
      </div>
    )
  }
}
