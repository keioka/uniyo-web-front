/* @flow */
import React, { Component, PropTypes } from 'react'
import FlipMove from 'react-flip-move'

import {
  CardPost,
  CardDocument,
  CardReview,
  CardQuestion,
} from '../../../index'

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
    const lastPost = posts[posts.length - 1]
    const { scrollHeight } = event.target.body
    const currentHeight = event.target.body.scrollTop + window.screen.availHeight
    //
    // console.log("---------------------------")
    // console.log(scrollHeight, currentHeight)
    // console.log(scrollHeight < currentHeight)
    // console.log("---------------------------")

    if (
      scrollHeight < currentHeight &&
      !this.state.isLoadingMorePost &&
      lastPost // to avoid bug 'lastPost returns undefined' while scrolling
    ) {

      console.log("postsSearch is fired!!")
      // TODO: fix bug 'this.props.postsSearch action dispatched twice'

      this.setState({
        // if it is not loaded, this won't be turned to false.
        // which means engine never call this block.
        isLoadingMorePost: true,

      }, () => {
        const params = { lastPostId: lastPost.id }
        params.hashtags = this.props.hashtag && [this.props.hashtag]
        params.types = this.props.type && [this.props.type]
        this.props.postsSearch(params)
      })
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

    const { commentsSearch, commentCreate } = this.props

    const cardFactory = ({ post, commentsSearch,
    comments }) => {
      switch(post.postType) {
        case TYPES['post']:
          return (
            <CardPost
              {...post}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
            />
          )
        case TYPES['docs']:
          return (
            <CardDocument
              {...post}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
            />
          )
        case TYPES['reviews']:
          return (
            <CardReview
              {...post}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
            />
          )
        case TYPES['questions']:
          return (
            <CardQuestion
              {...post}
              commentsSearch={commentsSearch}
              comments={comments}
              commentCreate={commentCreate}
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
            commentCreate,
            comments
          })
        })}
        { this.state.isLoadingMorePost && <div> Loading </div> }
      </div>
    )
  }
}