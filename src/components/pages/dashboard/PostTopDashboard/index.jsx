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
  sectionQuestion,
  sectionImage,
  sectionCards,
  sectionContentHeader,
  sectionContentFotter,
  textUserName,
  btnLike,
  btnComment,
  sectionCardsTitle,
} from './style'

export default class PostTopDashboard extends Component {

  componentDidMount() {
    const {
      postsTrendingSearch,
      postsRelevantSearch,
    } = this.props

    postsTrendingSearch({})
    postsRelevantSearch({ limit: 5 })
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
    } = this.props

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

        {trendingPosts && trendingPosts.length > 0 &&
          <div className={sectionCards}>
            <h3 className={sectionCardsTitle}>HOT 🔥</h3>
            {trendingPosts.map(post =>
              <CardPost
                {...post}
                postGiveDonuts={postGiveDonuts}
                comments={allComments}
                currentUser={currentUser}
                commentsSearch={commentsSearch}
                commentCreate={commentCreate}
              />
            )}
          </div>
        }

        {relevantPosts && relevantPosts.length > 0 &&
          <div className={sectionCards}>
            <h3 className={sectionCardsTitle}>RELEVANT</h3>
            {relevantPosts.map(post =>
              <CardPost
                {...post}
                postGiveDonuts={postGiveDonuts}
                comments={allComments}
                currentUser={currentUser}
                commentsSearch={commentsSearch}
                commentCreate={commentCreate}
              />
            )}
          </div>
        }

        { posts &&
          <div className={sectionCards}>
            { (trendingPosts && trendingPosts.length > 0) || (relevantPosts && relevantPosts.length > 0) &&
              <h3 className={sectionCardsTitle}>RECENT</h3> }
            {posts ? posts.slice(0, 5).map(post =>
              <CardPost
                {...post}
                postGiveDonuts={postGiveDonuts}
                comments={allComments}
                currentUser={currentUser}
                commentsSearch={commentsSearch}
                commentCreate={commentCreate}
              />
            ) : this.cardsFake }
          </div>
        }

      </div>
    )
  }
}
