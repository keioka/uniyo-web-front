/* @flow */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  CardPost,
  CardDocument,
  CardReview,
  CardQuestion,
  InputPost,
} from '../../../index'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import Cross from './cross'

import {
  sectionCards,
  barFilter,
  btnClose,
  enter,
  leave,
  appear,
} from './style'

export default class IndexDashboard extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    postsSearch: PropTypes.func.isRequired,
    hashtag: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    posts: [],
  }

  constructor() {
    super()
    this.state = {
      isLoadingMorePost: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', ::this.onScrollHandler)
  }

  onScrollHandler(event) {
    const dashboard = this._dashboard
    const { posts } = this.props
    const lastPost = posts[posts.length - 1] || true // <- if there is not post, assign true
    const { scrollHeight } = event.target.body
    const currentHeight = event.target.body.scrollTop + window.screen.availHeight

    // console.log("---------------------------")
    // console.log(scrollHeight, currentHeight)
    // console.log(scrollHeight < currentHeight)
    // console.log("---------------------------")

    if (
      scrollHeight < currentHeight &&
      !this.state.isLoadingMorePost &&
      lastPost // to avoid bug 'lastPost returns undefined' while scrolling
    ) {

      // TODO: fix bug 'this.props.postsSearch action dispatched twice'

      const searchPost = () => {
        const params = { lastPostId: lastPost.id }
        params.hashtags = this.props.hashtag && [this.props.hashtag]
        params.types = this.props.type && this.props.type !== 'ALL' && [this.props.type]
        this.props.postsSearch(params)
      }

      this.setState({
        // if it is not loaded, this won't be turned to false.
        // which means engine never call this block.
        isLoadingMorePost: true,
      }, searchPost)
    }
  }

  componentWillReceiveProps(prevProps, nextProps) {
    this.setState({
      isLoadingMorePost: false,
    })
  }

  render() {
    const TYPES = {
      docs: 'CLASS_NOTE',
      post: 'POST',
      reviews: 'REVIEW',
      questions: 'QUESTION',
    }

    const {
      commentsSearch,
      commentCreate,
      showUserInfo,
      currentUser,
      location,
      suggestionedUsers,
      userSearch,
      postCreate,
      onClearCurrentTypeHandler,
      currentPostType,
      postGiveDonuts,
      userGiveDonuts,
      commentGiveDonuts,
    } = this.props

    const { hashtags: hashtagsCurrentUser, image } = currentUser
    const { hashtag, type } = location.query

    const cardFactory = ({
      post,
      commentsSearch,
      comments,
      showUserInfo,
      currentUser,
      currentPostType,
    }) => {

      switch(post.type) {
        case TYPES['post']:
          return (
            <CardPost
              key={post.id}
              {...post}
              currentUser={currentUser}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              postGiveDonuts={postGiveDonuts}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              currentPostType={currentPostType}
            />
          )
        case TYPES['docs']:
          return (
            <CardDocument
              key={post.id}
              {...post}
              currentUser={currentUser}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              postGiveDonuts={postGiveDonuts}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              currentPostType={currentPostType}
            />
          )
        case TYPES['reviews']:
          return (
            <CardReview
              key={post.id}
              {...post}
              currentUser={currentUser}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              postGiveDonuts={postGiveDonuts}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              currentPostType={currentPostType}
            />
          )
        case TYPES['questions']:
          return (
            <CardQuestion
              key={post.id}
              {...post}
              currentUser={currentUser}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              postGiveDonuts={postGiveDonuts}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              currentPostType={currentPostType}
            />
          )
      }
    }

    return (
      <div ref={(div)=> this._dashboard = div}>
        <InputPost
          imgUrl={image && image.mediumUrl}
          onPostSubmit={postCreate}
          currentHashTag={hashtag}
          currentPostType={currentPostType}
          userSearch={userSearch}
          showUserInfo={showUserInfo}
        />
       {hashtag &&
         <div
           className={barFilter}
           onClearCurrentTypeHandler={onClearCurrentTypeHandler}
         >
           <Link
             to={type ? `dashboard?type=${type}` : `dashboard`}
             className={btnClose}
           >
             <Cross />
           </Link>
           <span>#{hashtag}</span>
        </div>
       }
       <div className={sectionCards}>
         {this.props.posts.map((post) => {
           const comments = this.props.allComments.filter(comment => comment.postId === post.id)
           return cardFactory({
             post,
             commentsSearch,
             commentCreate,
             comments,
             showUserInfo,
             currentUser,
           })
         })}
       </div>
     </div>
    )
  }
}
