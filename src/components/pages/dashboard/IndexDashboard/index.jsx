/* @flow */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../../../redux/actions'
import { bindActionCreators } from 'redux'

import {
  CardPost,
  CardDocument,
  CardReview,
  CardQuestion,
  CardFake,
  InputPost,
  BarTag,
} from '../../../index'

import {
  wrapper,
  wrapperShrink,
  sectionCards,
  sectionCardsTitle,
  sectionCardsBlank,
  barFilter,
  btnClose,
  enter,
  leave,
  appear,
} from './style'

const TYPES = {
  docs: 'CLASS_NOTE',
  post: 'POST',
  reviews: 'REVIEW',
  questions: 'QUESTION',
  all: 'ALL',
}

const mapStateToProps = state => ({
  currentUser: state.api.auth.currentUser,
  allPosts: state.api.posts.all,
  trendingPosts: state.api.posts.trending,
  allComments: state.api.comments.all,
  hashtags: state.api.hashtags.all,
  rightbar: state.ui.rightbar,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postInfo: actions.postInfo,
  postsSearch: actions.postsSearch,
  postCreate: actions.postCreate,
  postDelete: actions.postDelete,
  postsTrendingSearch: actions.postsTrendingSearch,
  postGiveDonuts: actions.postGiveDonuts,

  commentsSearch: actions.commentsSearch,
  commentCreate: actions.commentCreate,
  commentGiveDonuts: actions.commentGiveDonuts,
  commentDelete: actions.commentDelete,

  hashtagAdd: actions.hashtagAdd,

  channelSearch: actions.channelSearch,
  channelCreate: actions.channelCreate,
  messageSearch: actions.messageSearch,
  messageCreate: actions.messageCreate,

  showUserInfo: uiActions.showUserInfo,

  showPopup: uiActions.showPopup,
  donutsThrow: uiActions.donutsThrow,
  contentReadCheckNotification: uiActions.contentReadCheckNotification,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
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
    isLoadingMorePost: false,
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

  // shouldComponentUpdate(nextProps) {
  //   if (
  //     this.props.type !== nextProps.type ||
  //     this.props.hashtag !== nextProps.hashtag ||
  //     this.props.allPosts.length !== nextProps.allPosts.length ||
  //     this.props.hashtags.length !== nextProps.hashtags.length ||
  //     this.props.allComments.length !== nextProps.allComments.length ||
  //     this.props.trendingPosts.length !== nextProps.trendingPosts.length ||
  //     this.props.currentUser.hashtags !== nextProps.currentUser.hashtags ||
  //     this.props.rightbar.isOpen !== nextProps.rightbar.isOpen
  //   ) {
  //     // console.log('------------------------------')
  //     // console.log('type', this.props.type !== nextProps.type)
  //     // console.log('this.props.type', this.props.type)
  //     // console.log('nextProps.type', nextProps.type)
  //     //
  //     // console.log('hashtag', this.props.hashtag !== nextProps.hashtag)
  //     // console.log('this.props.hashtag', this.props.hashtag)
  //     // console.log('nextProps.hashtag', nextProps.hashtag)
  //     //
  //     // console.log('allPosts.length', this.props.allPosts.length !== nextProps.allPosts.length)
  //     // console.log('this.props.allPosts.length', this.props.allPosts.length)
  //     // console.log('nextProps.allPosts.length', nextProps.allPosts.length)
  //     //
  //     // console.log('hashtags.length', this.props.hashtags.length !== nextProps.hashtags.length)
  //     // console.log('this.props.hashtags.length', this.props.hashtags.length)
  //     // console.log('nextProps.hashtags.length', nextProps.hashtags.length)
  //     //
  //     // console.log('allComments.length', this.props.allComments.length !== nextProps.allComments.length)
  //     // console.log('this.props.allComments.length', this.props.allComments.length)
  //     // console.log('nextProps.allComments.length', nextProps.allComments.length)
  //     //
  //     // console.log('trendingPosts.length', this.props.trendingPosts.length !== nextProps.trendingPosts.length)
  //     // console.log('this.props.trendingPosts.length', this.props.trendingPosts.length)
  //     // console.log('nextProps.trendingPosts.length', nextProps.trendingPosts.length)
  //     //
  //     // console.log('currentUser', this.props.currentUser !== nextProps.currentUser)
  //     // console.log('this.props.currentUser', this.props.currentUser)
  //     // console.log('nextProps.currentUser', nextProps.currentUser)
  //     //
  //     // console.log('rightbar', this.props.rightbar !== nextProps.rightbar)
  //     // console.log('this.props.rightbar', this.props.rightbar)
  //     // console.log('nextProps.rightbar', nextProps.rightbar)
  //     //
  //     console.log('shouldComponentUpdate', 'update')
  //     return true
  //   }
  //   console.log('shouldComponentUpdate', 'no update')
  //   return false
  // }

  onScrollHandler(event) {
    const dashboard = this._dashboard
    const posts = this.filteredPosts()
    const lastPost = posts[posts.length - 1] || true // <- if there is not post, assign true
    const { scrollHeight } = event.target.body
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

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

  filteredPosts() {
    const { allPosts, hashtag, trendingPosts, type, location } = this.props
    let sortedPosts = allPosts
    const regexTag = /#([ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿa-zA-Z0-9-]+)/g

    if (hashtag) {
          // combine all trendingPosts relevantPosts allPosts and filter them
      sortedPosts = [ ...trendingPosts, ...sortedPosts ]
      sortedPosts = sortedPosts && sortedPosts.filter(post => {
        const hashtag:String = `#${location.query.hashtag.toLowerCase()}`
        const matched:Array = post.text.match(regexTag) || []
        return matched.map(hashtag => hashtag.toLowerCase()).includes(hashtag)
      })
    }
    if (type) {
      sortedPosts = sortedPosts.filter(post => post.type === type)
    }
    return sortedPosts
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
      commentDelete,
      commentGiveDonuts,

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

      donutsThrow,
      onReadContent,
      rightbar,
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
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
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
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
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
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
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
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
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
    const isHashtagAlreadyAdded = currentUser.hashtags && currentUser.hashtags.some((currentUserHashtag) => currentUserHashtag.hashtag === hashtag)
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
            {[...trendingPosts].sort((a, b) => b.donutsCount - a.donutsCount).map(post => {
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

       {hashtag && this.filteredPosts().length > 0 &&
          <BarTag
            type={type}
            isHashtagAlreadyAdded={isHashtagAlreadyAdded}
            currentPostType={this.props.currentPostType}
            hashtag={hashtag}
            hashtagAdd={hashtagAdd}
　　　　　　　showPopup={showPopup}
            onClearCurrentTypeHandler={onClearCurrentTypeHandler}
          />
       }

       {this.filteredPosts().length === 0 &&
          <BarTag
            type={type}
            isHashtagAlreadyAdded={isHashtagAlreadyAdded}
            empty
            currentPostType={this.props.currentPostType}
            hashtag={hashtag}
            hashtagAdd={hashtagAdd}
            showPopup={showPopup}
            onClearCurrentTypeHandler={onClearCurrentTypeHandler}
          />
       }

       {this.filteredPosts().length > 0 ?
       <div className={sectionCards}>
         {!currentHashTag && this.props.currentPostType === "ALL" && <h3 className={sectionCardsTitle}>RECENT</h3>}
         {this.filteredPosts().map((post) => {
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
       </div> : <BlankCardList isHashtagExist={!!hashtag} />
      }
     </div>
    )
  }
}

class BlankCardList extends Component {
  render() {
    return (
      <div className={sectionCardsBlank}>
        <div className={sectionCards}>
          <h3 className={sectionCardsTitle}>HOT 🔥</h3>
          <CardFake />
          <CardFake />
        </div>
        <div className={sectionCards}>
          <h3 className={sectionCardsTitle}>RELEVANT</h3>
          <CardFake />
          <CardFake />
        </div>
      </div>
    )
  }
}


IndexDashboard.propTypes = {
  // hashtag:,
  // type: ,
  // currentHashTag:,
  // currentPostType:,
  // posts:,
  // postsSearch: ,
  // allPosts,
  // trendingPosts,
  // location: ,
  // allComments:,
  // commentsSearch: ,
  // commentCreate: ,
  // hashtagAdd: ,
  // showUserInfo:,
  // currentUser:,
  // location:,
  // suggestionedUsers:,
  // userSearch:,
  // postCreate:,
  // onClearCurrentTypeHandler:,
  // currentPostType:,
  // currentHashTag:,
  // postGiveDonuts:,
  // userGiveDonuts:,
  // commentDelete:,
  // commentGiveDonuts:,
  // donutsThrow:,
  // onReadContent:,
  // rightbar:,
  // trendingPosts:,
  // posts:,
  // postDelete:,
  // showPopup:,
}
