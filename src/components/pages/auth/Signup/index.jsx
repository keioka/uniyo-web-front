import React, { Component, PropTypes } from 'react'

import {
  InputSearchSchool,
} from '../../../index'

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
    const { userCreate } = this.props
    const { email, name, password, school } = this.state.form
    console.log({username: email, password: password, name: name, schoolId: school.id})
    console.log(this.props)
    userCreate({name: name, email: email, password: password, schoolId: 1})
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
        username: <input type="text" onChange={event => this.setState({ form: { ...this.state.form, name: event.target.value } })} />
        email: <input type="text" onChange={event => this.setState({ form: { ...this.state.form, email: event.target.value } })} />
        password: <input type="text" onChange={event => this.setState({ form: { ...this.state.form, password: event.target.value } })} />
        <button onClick={::this.onSubmit} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>Signup</div>
        {this.state.pageIndex === 0 ? this.renderFirstPage : this.renderSecondPage}
      </div>
    )
  }
}
