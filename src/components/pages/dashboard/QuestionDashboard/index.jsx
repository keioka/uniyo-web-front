/* @flow */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../../../redux/actions'
import { bindActionCreators } from 'redux'

import {
  CardPost,
  InputPost,
  ButtonDonut,
  TextPost,
  Donut,
} from '../../../index'

import {
  wrapper,
  wrapperShrink,
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

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.api.auth.currentUser,
  users: state.api.users,
  question: state.api.posts.all.filter(post => post.type === 'QUESTION' && parseInt(post.id) === parseInt(ownProps.params.questionId))[0],
  allComments: state.api.comments.all,
  rightbar: state.ui.rightbar,
  answers: state.api.posts.all.filter(answer => parseInt(answer.questionId) === parseInt(ownProps.params.questionId)),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postInfo: actions.postInfo,
  postsSearch: actions.postsSearch,
  postCreate: actions.postCreate,
  postDelete: actions.postDelete,
  postsTrendingSearch: actions.postsTrendingSearch,
  postGiveDonuts: actions.postGiveDonuts,

  commentsSearch: actions.commentsSearch,
  commentCreate: actions.commentCreate,
  commentGiveDonuts: actions.commentGiveDonuts,
  commentDelete: actions.commentDelete,

  hashtagAdd: actions.hashtagAdd,

  channelSearch: actions.channelSearch,
  channelCreate: actions.channelCreate,
  messageSearch: actions.messageSearch,
  messageCreate: actions.messageCreate,
  answerSearch: actions.answerSearch,
  answerCreate: actions.answerCreate,

  showUserInfo: uiActions.showUserInfo,

  showPopup: uiActions.showPopup,
  donutsThrow: uiActions.donutsThrow,
  contentReadCheckNotification: uiActions.contentReadCheckNotification,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
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

  state = {
    isLoadingMorePost: false
  }

  componentDidMount() {
    const { question, answerSearch, postInfo, params } = this.props
    const { questionId } = params
    let answersCount
    if (question) {
      answersCount = question.answersCount
    }

    // window.addEventListener('scroll', ::this.onScrollHandler)
    this.props.answerSearch({ questionId, limit: 100 })
    this.props.postInfo({ postId: questionId })
  }

  onScrollHandler(event) {
    const dashboard = this._dashboard
    const { question } = this.props
    const answersCount = question && question.answersCount
    const lastPost = true // <- if there is not post, assign true
    const { scrollHeight } = event.target.body
    const currentHeight = event.target.body.scrollTop + window.screen.availHeight
    const { questionId } = this.props.params

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
        this.props.answerSearch({ questionId, limit: answersCount })
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
      question,
      answers,
      rightbar,
      postCreate,
      postDelete,
      answerCreate,
      commentsSearch,
      commentCreate,
　　　 commentDelete,
      showUserInfo,
      suggestionedUsers,
      userSearch,
      currentUser,
      allComments,
      postGiveDonuts,
      commentGiveDonuts,
      allPosts,
      onReadContent,
      showPopup,
    } = this.props

    const { image, firstName } = currentUser
    const { isOpen: isRightbarOpen } = rightbar
    const dashboardWrapperClassNames = isRightbarOpen ? wrapperShrink : wrapper
    const { questionId } = this.props.params

    const ComponentSectionQuestion = ({ user, text, showUserInfo, donutsCount }) => {
      return (
        <div className={sectionQuestion}>
          <div className={sectionImage} onClick={() => showUserInfo(question.user.id)}>
            <img src={user.image.smallUrl} alt="" />
          </div>
          <div className={sectionContent}>
            <div className={sectionContentHeader}>
              <span className={textUserName} onClick={() => showUserInfo(question.user.id)}>{user.firstName}</span>
            </div>
            <span className={sectionContentText}>
              <TextPost text={text} showUserInfo={showUserInfo} />
            </span>
            <div className={sectionContentFotter}>
              <span className={btnExit} onClick={() => this.props.router.goBack()}>Exit</span>
              <ButtonDonut donutsCount={donutsCount} onClick={() => postGiveDonuts({ postId: question.id })} />
            </div>
          </div>
        </div>
      )
    }

    const allAnswers = [...answers]
    const count = Math.max(...allAnswers.map(answer => answer.donutsCount))
    const answerBest = allAnswers.filter((answer, index) => answer.donutsCount !== 0 && answer.donutsCount === count)[0]
    const answersWithoutBest = answerBest ? allAnswers.filter(answer => answer.id != answerBest.id) : allAnswers
    const answerRecent = answersWithoutBest && answersWithoutBest.shift()
    const answersOther = answerBest ? answersWithoutBest.filter(answer => answer.id !== answerBest.id) : allAnswers

    const textPlaceHolder = question ? `Help @${question.user.firstName} to find the best answer` : 'Help other students to find the best answer'
    // TODO: Avoid Mutation


    return (
      <div className={dashboardWrapperClassNames} ref={(div)=> this._dashboard = div}>
        { question && <ComponentSectionQuestion {...question} showUserInfo={showUserInfo} /> }
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
        {answerBest &&
          <div className={[sectionCards].join(' ')}>
            <h3 className={sectionCardsTitle}>BEST ANSWER 🚀</h3>
            {answerBest &&
              <CardPost
                key={answerBest.id}
                {...answerBest}
                comments={allComments.filter(comment => comment.postId === answerBest.id)}
                currentUserId={currentUser.id}
                commentCreate={commentCreate}
                commentsSearch={commentsSearch}
                commentDelete={commentDelete}
                postGiveDonuts={postGiveDonuts}
                postDelete={postDelete}
                commentGiveDonuts={commentGiveDonuts}
                showUserInfo={showUserInfo}
                onReadContent={onReadContent}
                imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
                showPopup={showPopup}
              />
            }
          </div>
        }
        { answerRecent &&
          <div className={sectionCards}>
            <h3 className={sectionCardsTitle}>MOST RECENT ANSWER</h3>
            <CardPost
              key={answerRecent.id}
              {...answerRecent}
              comments={allComments.filter(comment => comment.postId === answerRecent.id)}
              currentUserId={currentUser.id}
              commentCreate={commentCreate}
              commentsSearch={commentsSearch}
              commentDelete={commentDelete}
              postGiveDonuts={postGiveDonuts}
              postDelete={postDelete}
              commentGiveDonuts={commentGiveDonuts}
              showUserInfo={showUserInfo}
              onReadContent={onReadContent}
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
              showPopup={showPopup}
            />
          </div>
        }
        { answersOther.length > 0 &&
          <div className={sectionCards}>
            <h3 className={sectionCardsTitle}>OTHER ANSWERS</h3>
            {answersOther.map(answer => {
              const comments = allComments.filter(comment => comment.postId === answer.id)
              return (
                <CardPost
                  key={answer.id}
                  {...answer}
                  comments={comments}
                  currentUserId={currentUser.id}
                  postGiveDonuts={postGiveDonuts}
                  postDelete={postDelete}
                  commentCreate={commentCreate}
                  commentsSearch={commentsSearch}
                  commentDelete={commentDelete}
                  commentGiveDonuts={commentGiveDonuts}
                  showUserInfo={showUserInfo}
                  onReadContent={onReadContent}
                  imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
                  showPopup={showPopup}
                />
              )
            })
          }
          </div>
       }
       </div>
       { answers.length === 0 &&
         <div className={sectionNoAnswer}>
           <p>🙏🤓🙏🤓🙏🤓🙏</p>
           <p>No answers yet.</p>
         </div>
       }
      </div>
    )
  }
}
