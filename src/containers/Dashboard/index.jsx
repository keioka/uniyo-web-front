/* @flow */

import React, { Component, PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import { Link } from 'react-router'

import {
  LayoutDashboard,
  SidebarLeft,
  NavPostType,
  Donnut,
  InputPostWrapper,
} from '../../components'

import {
  error,
  container,
  main,
  header,
  mainContent,
  footer,
  barNoification,
  inputPostWrapper,
  inputPostWrapperImageBox,
  input,
  icon,
} from './style'

import Setting from './settings.svg'
import Notification from './notification.svg'

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  comments: state.comments,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postsSearch: actions.postsSearch,
  postCreate: actions.postCreate,
  commentsSearch: actions.commentsSearch,
  commentCreate: actions.commentCreate,
}, dispatch)

const regexTag = /#([ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿa-zA-Z0-9-]+)/g

const TYPES = {
  docs: 'CLASS_NOTE',
  post: 'POST',
  reviews: 'REVIEW',
  questions: 'QUESTION',
  all: 'ALL',
}

const DOWN = "ArrowDown"
const UP = "ArrowUp"
const ENTER = "Enter"


@connect(mapStateToProps, mapDispatchToProps)
export default class DashBoard extends PureComponent {

  static propTypes = {
    location: PropTypes.objectOf.isRequired,
  }

  componentWillMount() {
    const { hashtag, type = 'all' } = this.props.location.query
    this.setState({
      currentHashTag: hashtag,
      currentPostType: TYPES[type],
    })
  }

  onSelectPostType(type) {
    console.warn("Nav Clicked", type)
    this.setState({
      currentPostType: type,
    }, () => console.warn(this.state))
  }

  onSelectHashTag(hashtag) {}

  componentWillReceiveProps(prevProps, nextProps) {
    const { currentHashTag, currentPostType } = this.state
    const { hashtag, type = 'all' } = prevProps.location.query
    const { postsSearch } = this.props
    console.warn("--------chnaged----------")
    console.log("hashtag", hashtag)
    console.log("currentPostType", currentHashTag)
    console.log("type", type)
    console.log("currentPostType", currentPostType)
    console.log(currentPostType === type)
    console.log(currentHashTag === hashtag)

    if (currentHashTag !== hashtag || currentPostType !== TYPES[type]) {
      this.setState({
        currentHashTag: hashtag,
        currentPostType: TYPES[type],
      })

      const params = {}
      if (hashtag) { params.hashtags = [hashtag] }
      if (type) { params.types = [TYPES[type]] }
      postsSearch(params)
    }
  }

  onKeyDownPostForm(event) {
    if (event.key === ENTER) {
      this.props.postCreate({
        postType: 'POST',
        text: event.target.value,
      })
    }
  }

  onClearCurrentTypeHandler() {
    this.setState({
      currentHashTag: undefined,
    }, () => {
      console.log(this.state)
    })
  }

  get renderContent() {
    const {
      commentCreate,
      commentsSearch,
      postCreate,
      postsSearch,
      posts,
      comments,
      auth,
    } = this.props

    const { hashtags, image } = auth.currentUser
    const { all: allPosts, fetching: isPostsFetching } = posts
    const { all: allComments } = comments
    const { hashtag, type } = this.props.location.query

    let sortedPosts = allPosts

    if (hashtag || type) {
      const params = {}
      if (hashtag) {
        params.hashtags = [hashtag]
      } else {
        params.types = [TYPES[type]]
      }
      // postsSearch(params)
    }

    // fileter feature
    if (hashtag) {
      sortedPosts = sortedPosts.filter(post => {
        const hashtag:String = `#${this.props.location.query.hashtag}`
        const matched:Array = post.text.match(regexTag) || []
        return matched.includes(hashtag)
      })
    }

    if (type) {
      sortedPosts = sortedPosts.filter(post => post.postType === TYPES[type])
    }

    const childComponents = React.Children.map(this.props.children, child => React.cloneElement(child, {
      posts: sortedPosts,
      hashtag,
      isPostsFetching,
      type: TYPES[type],
      allComments,
      postsSearch,
      postCreate,
      commentsSearch,
      commentCreate,
    }))

    return (
      <div className={container}>
        <SidebarLeft hashtags={hashtags} type={type} />
        <div className={main}>
          <header className={header}>
            <div>
              <Notification className={icon} />
              <Setting className={icon} />
            </div>

            <NavPostType
              onSelectPostType={::this.onSelectPostType}
              currentPostType={this.state.currentPostType}
              currentHashTag={hashtag}
            />

            <div><Donnut size="large" /></div>
          </header>
          <div>
            <span className={inputPostWrapper}>
              <span className={inputPostWrapperImageBox}>
                <img src={image ? image.mediumUrl : 'loading'} />
              </span>
              <input
                className={input}
                data-user-picture="dsa"
                placeholder={hashtag && `#${hashtag}`}
                onKeyDown={event => ::this.onKeyDownPostForm(event)}
              />
            </span>
          </div>
          {hashtag &&
            <div
              className={barNoification}
              onClearCurrentTypeHandler={::this.onClearCurrentTypeHandler}
            >
              <Link to={type ? `dashboard?type=${type}` : `dashboard`}>Close</Link>
              <span>#{hashtag}</span>
            </div>
          }
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
    const { fetching } = this.props.posts

    // TODO: fetching case
    return (
      <LayoutDashboard>
        { this.renderContent }
      </LayoutDashboard>
    )
  }
}
