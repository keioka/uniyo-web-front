/* @flow */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  CardPost,
  CardDocument,
  CardReview,
  CardQuestion,
  InputPost,
  BarTag,
} from '../../../index'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import {
  wrapper,
  wrapperShrink,
  sectionCards,
  sectionCardsTitle,
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

  state = {
    isLoadingMorePost: false
  }

  constructor() {
    super()
    this.onScrollHandler = this.onScrollHandler.bind(this)
  }

  componentDidMount() {
    if (this._dashboard) {
      window.addEventListener('scroll', this.onScrollHandler)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollHandler)
  }

  shouldUpdateComponent(nextProps) {
    // const {
    //   currentUser,
    //   location,
    //   suggestionedUsers,
    //   onClearCurrentTypeHandler,
    //   currentPostType,
    //   currentHashTag,
    //   rightbar,
    //   relevantPosts,
    //   trendingPosts,
    //   posts,
    // } = this.props
    return shallowCompare(this, nextProps, nextState)
  }

  onScrollHandler(event) {
    const dashboard = this._dashboard
    const { posts } = this.props
    const lastPost = posts[posts.length - 1] || true // <- if there is not post, assign true
    const { scrollHeight } = event.target.body
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    // console.log(scrollTop)
    // console.log(event.target.body.pageYOffset)
    const currentHeight = scrollTop + window.screen.availHeight

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

  componentWillReceiveProps(nextProps) {
    const { currentHashTag, currentPostType } = this.props
    if (
      currentHashTag !== nextProps.currentHashTag ||
      currentPostType !== nextProps.currentPostType
    ) {
      window.scrollTo(0, 0)
    }

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
      hashtagAdd,
      showUserInfo,
      currentUser,
      location,
      suggestionedUsers,
      userSearch,
      postCreate,
      onClearCurrentTypeHandler,
      currentPostType,
      currentHashTag,
      postGiveDonuts,
      userGiveDonuts,
      commentDelete,
      commentGiveDonuts,
      donutsThrow,
      onReadContent,
      rightbar,
      relevantPosts,
      trendingPosts,
      posts,
      postDelete,
      showPopup,
    } = this.props

    const { hashtags: hashtagsCurrentUser, image } = currentUser
    const { hashtag, type } = location.query
    const { isOpen: isRightbarOpen } = rightbar
    const dashboardWrapperClassNames = isRightbarOpen ? wrapperShrink : wrapper
    const cardFactory = ({
      post,
      postDelete,
      commentDelete,
      commentsSearch,
      comments,
      showUserInfo,
      currentUser,
      currentPostType,
      donutsThrow,
      onReadContent,
      showPopup,
    }) => {

      switch(post.type) {
        case TYPES['post']:
          return (
            <CardPost
              key={post.id}
              {...post}
              currentUserId={currentUser.id}
              imageCurrentUser={currentUser.image ? currentUser.image.smallUrl : ''}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              commentDelete={commentDelete}

              postGiveDonuts={postGiveDonuts}
              postDelete={postDelete}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              currentPostType={currentPostType}
              donutsThrow={donutsThrow}
              onReadContent={onReadContent}
              showPopup={showPopup}
            />
          )
        case TYPES['docs']:
          return (
            <CardDocument
              key={post.id}
              {...post}
              currentUserId={currentUser.id}
              imageCurrentUser={currentUser.image ? currentUser.image.smallUrl : ''}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              commentDelete={commentDelete}

              postGiveDonuts={postGiveDonuts}
              postDelete={postDelete}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              currentPostType={currentPostType}
              donutsThrow={donutsThrow}
              onReadContent={onReadContent}
              showPopup={showPopup}
            />
          )
        case TYPES['reviews']:
          return (
            <CardReview
              key={post.id}
              {...post}
              currentUserId={currentUser.id}
              imageCurrentUser={currentUser.image ? currentUser.image.smallUrl : ''}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              commentDelete={commentDelete}
              postGiveDonuts={postGiveDonuts}
              postDelete={postDelete}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              currentPostType={currentPostType}
              donutsThrow={donutsThrow}
              onReadContent={onReadContent}
              showPopup={showPopup}
            />
          )
        case TYPES['questions']:
          return (
            <CardQuestion
              key={post.id}
              {...post}
              currentUserId={currentUser.id}
              imageCurrentUser={currentUser.image ? currentUser.image.smallUrl : ''}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              commentDelete={commentDelete}
              postGiveDonuts={postGiveDonuts}
              postDelete={postDelete}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              currentPostType={currentPostType}
              donutsThrow={donutsThrow}
              onReadContent={onReadContent}
              showPopup={showPopup}
            />
          )
      }
    }

    return (
      <div className={dashboardWrapperClassNames} ref={div => this._dashboard = div}>
        <InputPost
          imgUrl={image && image.mediumUrl}
          onPostSubmit={postCreate}
          currentHashTag={hashtag}
          currentPostType={currentPostType}
          userSearch={userSearch}
          currentUserId={currentUser.id}
          showUserInfo={showUserInfo}
        />


        {!currentHashTag && currentPostType === "ALL" && trendingPosts && trendingPosts.length > 0 &&
          <div className={sectionCards}>
            <h3 className={sectionCardsTitle}>HOT 🔥</h3>
            {trendingPosts.map(post => {
              const comments = this.props.allComments.filter(comment => comment.postId === post.id)
              return cardFactory({
                post,
                commentsSearch,
                commentCreate,
                comments,
                showUserInfo,
                donutsThrow,
                currentUser,
                onReadContent,
                postDelete,
                commentDelete,
                showPopup,
              })
            })}
          </div>
        }

        {!currentHashTag && currentPostType === "ALL" && relevantPosts && relevantPosts.length > 0 &&
          <div className={sectionCards}>
            <h3 className={sectionCardsTitle}>RELEVANT</h3>
              {relevantPosts.map(post => {
                const comments = this.props.allComments.filter(comment => comment.postId === post.id)
                return cardFactory({
                  post,
                  commentsSearch,
                  commentCreate,
                  comments,
                  showUserInfo,
                  donutsThrow,
                  currentUser,
                  onReadContent,
                  postDelete,
                  commentDelete,
                  showPopup,
                })
              })}
          </div>
         }

       {hashtag &&
          <BarTag
            type={type}
            currentPostType={this.props.currentPostType}
            hashtag={hashtag}
            hashtagAdd={hashtagAdd}
            onClearCurrentTypeHandler={onClearCurrentTypeHandler}
          />
       }
       <div className={sectionCards}>
         {!currentHashTag && this.props.currentPostType === "ALL" && <h3 className={sectionCardsTitle}>RECENT</h3>}
         {this.props.posts.map((post) => {
           const comments = this.props.allComments.filter(comment => comment.postId === post.id)
           return cardFactory({
             post,
             commentsSearch,
             commentCreate,
             comments,
             showUserInfo,
             donutsThrow,
             currentUser,
             onReadContent,
             postDelete,
             commentDelete,
             showPopup,
           })
         })}
       </div>
     </div>
    )
  }
}
