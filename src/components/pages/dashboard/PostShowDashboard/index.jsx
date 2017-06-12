/* @flow */
import React, { Component, PropTypes } from 'react'

import {
  CardPost,
  CardDocument,
  CardReview,
  CardQuestion,
  CardFake,
  InputPost,
  Donnut,
  TextPost,
} from '../../../index'

import {
  wrapper,
  wrapperShrink,
  sectionCards,
  sectionContentHeader,
  sectionContentFotter,
  textUserName,
  sectionCardsTitle,
} from './style'

export default class PostShowDashboard extends Component {

  componentDidMount() {
    const { posts, params, postInfo } = this.props
    const { all } = posts
    const post = posts.filter(post => post.id == params.postId)[0]
    if (!post) {
      postInfo({
        postId: params.postId,
      })
    }
  }

  render() {

    const TYPES = {
      docs: 'CLASS_NOTE',
      post: 'POST',
      reviews: 'REVIEW',
      questions: 'QUESTION',
    }

    const {
      postCreate,
      comments,
      commentsSearch,
      commentCreate,
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allComments,
      postGiveDonuts,
      postsTrendingSearch,
      postsRelevantSearch,
      relevantPosts,
      trendingPosts,
      posts,
      postInfo,
      userGiveDonuts,
      commentGiveDonuts,
    } = this.props

    const cardFactory = ({
      post,
      commentsSearch,
      comments,
      showUserInfo,
      currentUser,
      userGiveDonuts,
      commentGiveDonuts,
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
            />
          )
      }
    }

    const { params } = this.props
    const { all } = posts
    const post = posts.filter(post => post.id == params.postId)[0]
    const { image } = currentUser
    return (
      <div ref={(div)=> this._dashboard = div}>
        <InputPost
          imgUrl={image && image.mediumUrl}
          onPostSubmit={postCreate}
          currentPostType={'ALL'}
          userSearch={userSearch}
          showUserInfo={showUserInfo}
        />
        <div className={sectionCards}>
        { post && cardFactory({
            post,
            commentsSearch,
            commentCreate,
            comments,
            showUserInfo,
            currentUser,
            userGiveDonuts,
            commentGiveDonuts,
          })
        }
        </div>
      </div>
    )
  }
}
