/* @flow */
import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../../../redux/actions'
import { bindActionCreators } from 'redux'

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
} from './style.scss'

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.api.auth.currentUser,
  post: state.api.posts.all.filter(post => parseInt(post.id) === parseInt(ownProps.params.postId))[0],
  comments: state.api.comments.all.filter(comment => parseInt(comment.postId) === parseInt(ownProps.params.postId)),
  rightbar: state.ui.rightbar,
  notifications: state.api.notifications,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postInfo: actions.postInfo,
  postCreate: actions.postCreate,
  postDelete: actions.postDelete,
  postGiveDonuts: actions.postGiveDonuts,
  commentsSearch: actions.commentsSearch,
  commentCreate: actions.commentCreate,
  commentGiveDonuts: actions.commentGiveDonuts,
  commentDelete: actions.commentDelete,
  showUserInfo: uiActions.showUserInfo,
  showPopup: uiActions.showPopup,
}, dispatch)


@connect(mapStateToProps, mapDispatchToProps)
export default class PostShowDashboard extends Component {

  componentDidMount() {
    const { post, postInfo, params } = this.props
    if (!post) {
      postInfo({
        postId: params.postId,
      })
    }
  }

  componentDidUpdate() {
    const { post } = this.props
    if (post && post.type === 'ANSWER') {
      browserHistory.push(`/dashboard/questions/${post.questionId}?hightlightedAnswerId=${post.id}`)
    }
  }

  render() {

    const TYPES = {
      docs: 'CLASS_NOTE',
      post: 'POST',
      reviews: 'REVIEW',
      questions: 'QUESTION',
      answer: 'ANSWER',
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
      post,
      comments,
      postInfo,
      userGiveDonuts,
      commentGiveDonuts,
      onReadContent,
      showPopup,
      params,
      rightbar,
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
      showPopup,
    }) => {

      switch(post.type) {
        case TYPES['post']:
          return (
            <CardPost
              key={post.id}
              {...post}
              currentUserId={currentUser.id}
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
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
              showPopup={showPopup}
              openComment
            />
          )
        case TYPES['docs']:
          return (
            <CardDocument
              key={post.id}
              {...post}
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
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
              showPopup={showPopup}
              openComment
            />
          )
        case TYPES['reviews']:
          return (
            <CardReview
              key={post.id}
              {...post}
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
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
              showPopup={showPopup}
              openComment
            />
          )
        case TYPES['questions']:
          return (
            <CardQuestion
              key={post.id}
              {...post}
              imageCurrentUser={currentUser.image ? currentUser.image.mediumUrl : ''}
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
              showPopup={showPopup}
              openComment
            />
          )
      }
    }

    const { image } = currentUser
    const { isOpen: isRightbarOpen } = rightbar
    const dashboardWrapperClassNames = isRightbarOpen ? wrapperShrink : wrapper
    if (post && post.commentsCount > 0 && comments.length !== post.commentsCount) {
      commentsSearch({ postId: post.id, limit: post.commentsCount })
    }
    return (
      <div className={dashboardWrapperClassNames} ref={(div)=> this._dashboard = div}>
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
            showPopup,
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
