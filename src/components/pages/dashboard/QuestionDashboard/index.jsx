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
    const {
      postCreate,
      commentsSearch,
      commentCreate,
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allComments,
    } = this.props

    const { image } = currentUser


    const { answerCreate } = this.props
    const { questionId } = this.props.params
    const question = this.props.posts.filter((post) => post.postType === 'QUESTION' && post.id == questionId)[0]
    const answers = this.props.allAnswers.filter(answer => answer.questionId == questionId)

    if (question) {
      var { user, text, commentsCount, likesCount } = question
    }


    const answerBest = answers.filter(answer => answer.isBestAnswer)
    const isBestAnswerExsist = answerBest.lenght > 0
    const answerRecent = answers && answers[answers.length - 1]

    // TODO: Avoid Mutation
    const answersOther = [...answers]
    answersOther.splice(answers.length - 1, 1)

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
                <button className={btnComment} data-count={likesCount}><Donnut size="xs"/></button>
              </div>
            </div>
          </div>
        }
        <InputPost
          imgUrl={image && image.mediumUrl}
          onPostSubmit={answerCreate}
          currentPostType={'ANSWER'}
          // suggestionedUsers={suggestionedUsers}
          userSearch={userSearch}
          showUserInfo={showUserInfo}
          questionId={questionId}
        />
        {isBestAnswerExsist &&
          <div className={sectionCards}>
            <h3 className={sectionCardsTitle}>BEST ANSWER</h3>
            {answerBest.map(answer => {
              return (
                <CardPost
                  key={answer.id}
                  {...answer}
                  comments={allComments}
                  currentUser={currentUser}
                  commentCreate={commentCreate}
                  commentsSearch={commentsSearch}
                />
              )
            })}
          </div>
        }
        { answerRecent &&
          <div className={sectionCards}>
            <h3 className={sectionCardsTitle}>MOST RECENT ANSWER</h3>
            <CardPost
              key={answerRecent.id}
              {...answerRecent}
              comments={allComments}
              currentUser={currentUser}
              commentCreate={commentCreate}
              commentsSearch={commentsSearch}
            />
          </div>
        }
        <div className={sectionCards}>
          <h3 className={sectionCardsTitle}>OTHER ANSWERS</h3>
          {answersOther.map(answer => (
            <CardPost
              key={answer.id}
              {...answer}
              comments={allComments}
              currentUser={currentUser}
              commentCreate={commentCreate}
              commentsSearch={commentsSearch}
            />
            ))}
        </div>
      </div>
    )
  }
}
