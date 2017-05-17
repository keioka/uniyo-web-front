/* @flow */
import React, { Component, PropTypes } from 'react'

import {
  CardPost,
  CardDocument,
  CardReview,
  CardQuestion,
  InputPost,
  Donnut,
  TextPost,
} from '../../../index'

import {
  sectionQuestion,
  sectionImage,
  sectionContent,
  sectionContentHeader,
  sectionContentFotter,
  textUserName,
  btnLike,
  btnComment,
  sectionCards,
  sectionCardsTitle,
} from './style'

export default class PostTopDashboard extends Component {

  componentDidMount() {
    const {
      postsTrendingSearch,
      postsRelevantSearch,
    } = this.props

    postsTrendingSearch({})
    postsRelevantSearch({limit: 5})
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
      postsTrendingSearch,
      postsRelevantSearch,
      relevantPosts,
      trendingPosts,
    } = this.props

    return (
      <div ref={(div)=> this._dashboard = div}>

        {trendingPosts && trendingPosts.length === 0 &&
         relevantPosts && relevantPosts.length === 0 &&
           <div>
            show dammy dsda
           </div>
         }

        {trendingPosts && trendingPosts.length > 0 && trendingPosts.map(post =>
          <div>
            {post.id}
          </div>
        )}

      </div>
    )
  }
}
