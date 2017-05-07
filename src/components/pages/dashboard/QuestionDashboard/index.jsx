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
} from './style'

export default class QuestionDashboard extends Component {

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
    const { questionId } = this.props.params
    window.addEventListener('scroll', ::this.onScrollHandler)
    this.props.answerSearch({ questionId })
    this.props.postInfo({ postId: questionId })
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
      postCreate,
      commentsSearch,
      commentCreate,
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      comments,
    } = this.props

    const { hashtags: hashtagsCurrentUser, image } = currentUser

    const cardFactory = ({ post, commentsSearch,
    comments, showUserInfo, currentUser }) => {
      switch(post.postType) {
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
            />
          )
      }
    }

    const { answerCreate } = this.props
    const { questionId } = this.props.params
    const question = this.props.posts.filter((post) => post.postType === 'QUESTION' && post.id == questionId)[0]
    const answers = this.props.allAnswers.filter(answer => answer.questionId == questionId)

    if (question) {
      var { user, text, commentsCount, likesCount } = question
    }

    return (
      <div ref={(div)=> this._dashboard = div}>
        { question &&
          <div className={sectionQuestion}>
            <div className={sectionImage}>
              <img src={user.image.smallUrl} alt="" />
            </div>
            <div className={sectionContent}>
              <div className={sectionContentHeader}>
                <span className={textUserName}>{user.name}</span>
                {/* <span className={textPostTime}>{time}</span> */}
              </div>
              <TextPost text={text} showUserInfo={showUserInfo} />
              <div className={sectionContentFotter}>
                <button className={btnLike} data-count={commentsCount}>comments</button>
                <button className={btnComment} data-count={likesCount}><Donnut size="xs"/></button>
              </div>
            </div>
          </div>
        }
        <InputPost
          imgUrl={image && image.mediumUrl}
          onPostSubmit={answerCreate}
          currentPostType={'ANSWER'}
          suggestionedUsers={suggestionedUsers}
          userSearch={userSearch}
          showUserInfo={showUserInfo}
          questionId={questionId}
        />
        <div className={sectionCards}>
          {answers.map(answer => {
            return (
              <CardPost {...answer} />
            )
          })}
        </div>

      </div>
    )
  }
}
