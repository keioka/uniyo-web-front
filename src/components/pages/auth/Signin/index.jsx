import React, { Component, PropTypes } from 'react'
import {
  InputSearchSchool,
} from '../../../index'

export default class Signin extends Component {

  static propTypes = {
    // schoolsSearch: PropTypes.func.isRequired,
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
        email: <input type="text" />
        password: <input type="text" />
        password confirmation: <input type="text" />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>Signin</div>
        {this.state.pageIndex === 0 ? this.renderFirstPage : this.renderSecondPage}
        <button onClick={::this.onClick} />
      </div>
    )
  }
}
