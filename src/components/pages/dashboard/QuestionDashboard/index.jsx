/* @flow */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {
  CardPost,
  InputPost,
  ButtonDonut,
  TextPost,
  Donut,
} from '../../../index'

import {
  sectionQuestion,
  sectionImage,
  sectionContent,
  sectionContentHeader,
  sectionContentText,
  sectionContentFotter,
  textUserName,
  btnLike,
  btnExit,
  btnComment,
  sectionCards,
  sectionCardsFirst,
  sectionCardsTitle,
  sectionNoAnswer,
  sectionNoAnswerTitle,
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
    const question = this.props.posts.filter((post) => post.type === 'QUESTION' && post.id == questionId)[0]
    const answersCount = question && question.answersCount
    const lastPost = posts[posts.length - 1] || true // <- if there is not post, assign true
    const { scrollHeight } = event.target.body
    const currentHeight = event.target.body.scrollTop + window.screen.availHeight
    const questionId = this.props.params.questionId
    const answers = this.props.allPosts.filter(answer => answer.questionId == questionId)

    // console.log("---------------------------")
    // console.log(scrollHeight, currentHeight)
    // console.log(scrollHeight < currentHeight)
    // console.log("---------------------------")

    // avoid unneccessary api get answers call
    if (answersCount === answers.length) {
      return false
    }

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
      postGiveDonuts,
      commentGiveDonuts,
      allPosts,
    } = this.props

    const { image, firstName } = currentUser

    const { answerCreate } = this.props
    const { questionId } = this.props.params
    const question = this.props.posts.filter((post) => post.type === 'QUESTION' && post.id == questionId)[0]
    const answers = allPosts.filter(post => post.type === 'ANSWER' && post.questionId == questionId)
    const ComponentSectionQuestion = ({ user, text, showUserInfo, donutsCount }) => {
      return (
        <div className={sectionQuestion}>
          <div className={sectionImage}>
            <img src={user.image.smallUrl} alt="" />
          </div>
          <div className={sectionContent}>
            <div className={sectionContentHeader}>
              <span className={textUserName}>{user.firstName}</span>
            </div>
            <span className={sectionContentText}>
              <TextPost text={text} showUserInfo={showUserInfo} />
            </span>
            <div className={sectionContentFotter}>
              <span className={btnExit} onClick={() => this.props.router.goBack()}>Exit</span>
              <ButtonDonut donutsCount={donutsCount} onClick={() => postGiveDonuts({ postId: question.id })}/>
            </div>
          </div>
        </div>
      )
    }

    const answerBest = answers ? answers.reduce(function(a, b) {
      return Math.max(a.donutsCount, b.donutsCount)
    }, 0) : []

    const isBestAnswerExsist = answerBest.lenght > 0
    const answerRecent = answers && answers[0]
    const textPlaceHolder = question ? `Help @${question.user.firstName} to find the best answer` : 'Help other students to find the best answer'
    // TODO: Avoid Mutation
    const answersOther = [...answers]
    answersOther.splice(answers.length - 1, 1)

    return (
      <div ref={(div)=> this._dashboard = div}>
        { question && <ComponentSectionQuestion {...question} /> }
        <InputPost
          imgUrl={image && image.mediumUrl}
          placeholder={textPlaceHolder}
          onPostSubmit={answerCreate}
          currentPostType={'ANSWER'}
          userSearch={userSearch}
          showUserInfo={showUserInfo}
          questionId={questionId}
        />
        <div className={sectionCardsFirst}>
        {isBestAnswerExsist &&
          <div className={[sectionCards].join(' ')}>
            <h3 className={sectionCardsTitle}>BEST ANSWER 🚀</h3>
            {answerBest.map(answer => {
              return (
                <CardPost
                  key={answer.id}
                  {...answer}
                  comments={allComments}
                  currentUser={currentUser}
                  commentCreate={commentCreate}
                  commentsSearch={commentsSearch}
                  postGiveDonuts={postGiveDonuts}
                  commentGiveDonuts={commentGiveDonuts}
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
              postGiveDonuts={postGiveDonuts}
              commentGiveDonuts={commentGiveDonuts}
            />
          </div>
        }
        { answersOther.length > 0 &&
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
                postGiveDonuts={postGiveDonuts}
                commentGiveDonuts={commentGiveDonuts}
              />
            ))}
          </div>
       }
       </div>
       { answers.length === 0 &&
         <div className={sectionNoAnswer}>
           <Donut size="large" color="PINK" />
           <h3 className={sectionNoAnswerTitle}>No Answers.</h3>
         </div>
       }
      </div>
    )
  }
}
