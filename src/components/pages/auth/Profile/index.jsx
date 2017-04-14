import React, { Component, PropTypes } from 'react'

import {
  InputSearchSchool,
  InputTextTransparent,
  Button,
} from '../../../index'

import {
  layout,
  layoutFos,
  layoutClasses,
  layoutProfilePicture,
  header,
  title,
  content,
  input,
  bottom,
} from './style'

export default class Profile extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired
  }

  constructor() {
    super()
    this.state = {
      pageIndex: 0,
      form: {
        tagsFos: [],
        tagsClass: [],
      },
    }
  }

  onNext() {
    if (this.state.pageIndex > 2) return
    this.setState({
      pageIndex: this.state.pageIndex + 1
    })
  }

  onSubmit() {
    const { userCreate } = this.props
    const { email, firstName, lastName, password, school } = this.state.form
  }

  get renderFirstPage() {
    return (
      <div className={layoutFos}>
        <div className={header}>
          <h2 className={title}>Yo. What is your campus?</h2>
        </div>
        <div className={content}>

        </div>
        <div className={bottom}>
          <Button onClick={::this.onNext}>Next</Button>
        </div>
      </div>
    )
  }

  get renderSecondPage() {
    return (
      <div className={layoutClasses}>
        <div className={header}>
          <h2 className={title}>What are your courses?</h2>
        </div>
        <div className={content}>
          <InputTextTransparent
            className={input}
            onChange={value => this.setState({ form: { ...this.state.form, firstName: value } })}
            placeholder="First Name"
          />
        </div>
        <div className={bottom}>
          <Button onClick={::this.onNext}>Next</Button>
        </div>
      </div>
    )
  }

  get renderThirdPage() {
    return (
      <div className={layoutProfilePicture}>
        <div className={header}>
          <h2 className={title}>Last step. Your profile picture! 😙</h2>
        </div>
        <div className={content}>
          <ul>
            <li>Your Facebook picture</li>
            <li>Active your webcam</li>
            <li>Find on your computer</li>
            <li>Choose your avatar</li>
          </ul>
        </div>
        <Button onClick={::this.onNext}>Next</Button>
      </div>
    )
  }

  renderCarousel() {
    if (this.state.pageIndex === 0) {
      return this.renderFirstPage
    } else if (this.state.pageIndex === 1) {
      return this.renderSecondPage
    } else if (this.state.pageIndex === 2) {
      return this.renderThirdPage
    }
  }

  render() {
    return (
      <div className={layout}>
        {::this.renderCarousel()}
      </div>
    )
  }
}
