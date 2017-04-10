import React, { Component, PropTypes } from 'react'

export default class Signin extends Component {

  static propTypes = {}

  constructor() {
    super()
    this.state = {
      pageIndex: 0
    }
  }

  onClick() {
    this.setState({
      pageIndex: this.state.pageIndex + 1
    })
  }

  onChangeText(event) {
    console.log(event.target.value)
  }

  get renderFirstPage() {
    return (
      <div>1</div>
    )
  }

  get renderSecondPage() {
    return (
      <div>2</div>
    )
  }

  render() {
    return (
      <div>
        <div>Signin</div>
        <input type="text" onChange={::this.onChangeText} />
        { this.state.pageIndex === 0 ? this.renderFirstPage : this.renderSecondPage}
        <button onClick={::this.onClick}></button>
      </div>
    )
  }
}
