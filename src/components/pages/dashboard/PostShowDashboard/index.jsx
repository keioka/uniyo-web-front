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
      commentsSearch,
      commentCreate,
      commentDelete,
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allComments,
      postDelete,
      postGiveDonuts,
      postsTrendingSearch,
      postsRelevantSearch,
      relevantPosts,
      trendingPosts,
      posts,
      postInfo,
      userGiveDonuts,
      commentGiveDonuts,
      onReadContent,
    } = this.props

    const cardFactory = ({
      post,
      postDelete,
      commentDelete,
      commentsSearch,
      comments,
      showUserInfo,
      currentUser,
      userGiveDonuts,
      commentGiveDonuts,
      onReadContent,
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
              commentDelete={commentDelete}
              comments={comments}
              commentCreate={commentCreate}
              postGiveDonuts={postGiveDonuts}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              onReadContent={onReadContent}
              postDelete={postDelete}
            />
          )
        case TYPES['docs']:
          return (
            <CardDocument
              key={post.id}
              {...post}
              imageCurrentUser={currentUser.image ? currentUser.image.smallUrl : ''}
              currentUserId={currentUser.id}
              showUserInfo={showUserInfo}
              commentDelete={commentDelete}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              postGiveDonuts={postGiveDonuts}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              onReadContent={onReadContent}
              postDelete={postDelete}
            />
          )
        case TYPES['reviews']:
          return (
            <CardReview
              key={post.id}
              {...post}
              imageCurrentUser={currentUser.image ? currentUser.image.smallUrl : ''}
              currentUserId={currentUser.id}
              showUserInfo={showUserInfo}
              commentDelete={commentDelete}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              postGiveDonuts={postGiveDonuts}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              onReadContent={onReadContent}
              postDelete={postDelete}
            />
          )
        case TYPES['questions']:
          return (
            <CardQuestion
              key={post.id}
              {...post}
              imageCurrentUser={currentUser.image ? currentUser.image.smallUrl : ''}
              currentUserId={currentUser.id}
              showUserInfo={showUserInfo}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
              postGiveDonuts={postGiveDonuts}
              userGiveDonuts={userGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
              onReadContent={onReadContent}
              postDelete={postDelete}
            />
          )
      }
    }

    const { params } = this.props
    const { all } = posts
    const post = posts.filter(post => post.id == params.postId)[0]
    const { image } = currentUser
    const comments = post ? this.props.allComments.filter(comment => comment.postId === post.id) : []

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
            postDelete,
            commentsSearch,
            commentCreate,
            commentDelete,
            comments,
            showUserInfo,
            currentUser,
            userGiveDonuts,
            commentGiveDonuts,
            onReadContent,
          })
        }
        </div>
      </div>
    )
  }
}
