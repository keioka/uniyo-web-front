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
    const {
      postCreate,
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
    } = this.props

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
        { post &&
          <CardPost {...post} />
        }
        </div>
      </div>
    )
  }
}
