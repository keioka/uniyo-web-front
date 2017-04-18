/* @flow */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'

import {
  LayoutDashboard,
  SidebarLeft,
  NavPostType,
} from '../../components'

import {
  error,
  container,
  main,
  header,
  mainContent,
} from './style'

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class DashBoard extends Component {

  static propTypes = {}

  constructor() {
    super()
    this.state = {
      currentPostType: 'ALL',
    }
  }

  onSelectPostType(type) {
    this.setState({
      currentPostType: type
    })
  }

  get renderContent() {
    const { hashtags } = this.props.auth.currentUser
    const { all } = this.props.post

    const childComponents = React.Children.map(this.props.children, child => React.cloneElement(child, {
      allPosts: all
    }))

    return (
      <div className={container}>
        <SidebarLeft hashtags={hashtags} />
        <div className={main}>
          <header className={header}>
            <NavPostType onSelectPostType={::this.onSelectPostType} currentPostType={this.state.currentPostType} />
          </header>
          <div className={mainContent}>
            {childComponents}
          </div>
          <footer>footer</footer>
        </div>
      </div>
    )
  }

  get renderLoading() {
    return (
      <div>Loading</div>
    )
  }

  render() {
    const { fetching } = this.props.post
    return (
      <LayoutDashboard>
        { fetching ? this.renderLoading : this.renderContent }
      </LayoutDashboard>
    )
  }
}
