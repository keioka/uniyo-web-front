/* @flow */

import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'

import {
  LayoutDashboard,
  SidebarLeft,
  NavPostType,
  Donnut,
} from '../../components'

import {
  error,
  container,
  main,
  header,
  mainContent,
  footer,
  barNoification,
  input,
  icon,
} from './style'

import Setting from './settings.svg'
import Notification from './notification.svg'

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  comment: state.comment,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postsSearch: actions.postsSearch,
  commentsSearch: actions.commentsSearch,
}, dispatch)

const regexTag = /#([ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿa-zA-Z0-9-]+)/g

@connect(mapStateToProps, mapDispatchToProps)
export default class DashBoard extends PureComponent {

  static propTypes = {}

  constructor() {
    super()
    this.state = {
      currentPostType: 'ALL',
    }
  }

  componentWillMount() {
    
    const { hashtag } = this.props.location.query
    this.setState({
      currentHashTag: hashtag,
    })
  }

  onSelectPostType(type) {
    this.setState({
      currentPostType: type
    })
  }

  get renderContent() {
    const {
      commentsSearch,
      postsSearch,
      post,
      comment,
      auth,
    } = this.props


    const TYPES = {
      docs: 'CLASS_NOTE',
      post: 'POST',
      reviews: 'REVIEW',
      questions: 'QUESTION',
    }

    const { hashtags } = auth.currentUser
    const { all: allPosts } = post
    const { all: allComments } = comment
    const { hashtag } = this.props.location.query
    const { type } = this.props.location.query
    let sortedPosts = allPosts

    if (hashtag) {
      postsSearch({hashtags: [hashtag]})
      sortedPosts = sortedPosts.filter(post => {
        const hashtag:String = `#${this.props.location.query.hashtag}`
        const matched:Array = post.text.match(regexTag) || []
        return matched.includes(hashtag)
      })
    }

    if (type) {
      sortedPosts = sortedPosts.filter(post => {
        return post.postType === TYPES[type]
      })
    }

    const childComponents = React.Children.map(this.props.children, child => React.cloneElement(child, {
      posts: sortedPosts,
      hashtag,
      type: TYPES[type],
      allComments,
      postsSearch,
      commentsSearch,
    }))

    return (
      <div className={container}>
        <SidebarLeft hashtags={hashtags} />
        <div className={main}>
          <header className={header}>
            <div>
              <Notification className={icon} />
              <Setting className={icon} />
            </div>

            <NavPostType onSelectPostType={::this.onSelectPostType} currentPostType={this.state.currentPostType} />
            <div><Donnut size="large" /></div>
          </header>
          <div>
            <input className={input} data-user-picture="dsa" />
          </div>
          { hashtag && <div className={barNoification}>#{hashtag}</div>}
          <div className={mainContent}>
            {childComponents}
          </div>
          <footer className={footer}></footer>
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

    // TODO: fetching case
    return (
      <LayoutDashboard>
        { this.renderContent }
      </LayoutDashboard>
    )
  }
}
