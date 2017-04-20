/* @flow */
import React, { Component, PropTypes } from 'react'

import {
  Button,
  CardPost,
  CardDocument,
  CardReview,
  CardQuestion,
} from '../../../index'

export default class IndexDashboard extends Component {

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
    const lastPost = posts[posts.length - 1]
    const { scrollHeight } = event.target.body
    const currentHeight = event.target.body.scrollTop + window.screen.availHeight

    if (
      scrollHeight === currentHeight &&
      !this.state.isLoadingMorePost &&
      lastPost // to avoid bug 'lastPost returns undefined' while scrolling
    ) {

      // TODO: fix bug 'this.props.postsSearch action dispatched twice'
      this.setState({
        isLoadingMorePost: true,
      }, () => {
        const params = {lastPostId: lastPost.id}
        params.hashtags = this.props.hashtag && [this.props.hashtag]
        params.types = this.props.type && [this.props.type]
        this.props.postsSearch(params)
      })
    }
  }

  componentWillReceiveProps() {
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

    const { commentsSearch } = this.props

    const cardFactory = ({ post, commentsSearch,
    comments }) => {
      switch(post.postType) {
        case TYPES['post']:
          return (
            <CardPost
              {...post}
              commentsSearch={commentsSearch}
              comments={comments}
            />
          )
        case TYPES['docs']:
          return (
            <CardDocument
              {...post}
              commentsSearch={commentsSearch}
              comments={comments}
            />
          )
        case TYPES['reviews']:
          return (
            <CardReview
              {...post}
              commentsSearch={commentsSearch}
              comments={comments}
            />
          )
        case TYPES['questions']:
          return (
            <CardQuestion
              {...post}
              commentsSearch={commentsSearch}
              comments={comments}
            />
          )
      }
    }


    return (
      <div ref={(div)=> this._dashboard = div}>
        {this.props.posts.map((post) => {
          const comments = this.props.allComments.filter(comment => comment.postId === post.id)
          return cardFactory({
            post,
            commentsSearch,
            comments
          })
        })}

        { this.state.isLoadingMorePost && <div> Loading </div> }
      </div>
    )
  }
}
