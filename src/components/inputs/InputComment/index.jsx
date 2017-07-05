import React, { Component, PropTypes } from 'react'

import {
  input,
  inputBoxImg,
  wrapper,
  instruction,
  instructionCommand,
  instructionItem,
} from './style'

import localStorage from '../../../utils/localStorageHandler'
import postTranspiler from '../../../utils/postTranspiler'

import $ from 'jquery'
import 'jquery.caret'
import 'style-loader!css-loader!at.js/dist/css/jquery.atwho.css'
import 'at.js'

export default class InputComment extends Component {

  onKeyDownHandler = (event) => {
    const { postId, commentCreate } = this.props
    const text = postTranspiler(this._inputComment)

    if (event.keyCode === 27) {
      this.props.closeCommentBox()
    }

    if (event.keyCode === 13 && !event.isDefaultPrevented()) {
      if (!event.shiftKey) {
        event.preventDefault()
        commentCreate({ postId , text: text})
        this._inputComment.innerHTML = ''
      }
    }
  }

  componentDidMount() {
    $(this._inputComment).atwho({
      at: "@",
      callbacks: {
        remoteFilter: function(query, callback) {
          const accessToken = localStorage.accessToken
          if (query) {
            $.ajax({
              url: `https://api.uniyo.io/v1/users/search?query=${query}&access_token=${accessToken}`,
              type: 'GET',
              dataType: 'json',
              success: function(users) {
                // pull image
                const mappedData = users.map(user => ({
                  id: user.id,
                  name: user.name,
                  image: user.image.small_url,
                }))

                callback(mappedData)
              },
              error: function() {
                console.warn('Search is not working')
              }
            })
          }
        }
      },
      displayTpl: "<li style='display: flex; align-items: center; font-family: Roboto; padding: 5px 10px;'><img style='width: 40px; height: 40px; border-radius: 50%; margin-right: 15px;' src='${image}' /> ${name}</li>",
      insertTpl: "<span onClick='void 0' data-user-id=${id}>@${name}</span>",
      searchKey: 'name'
    }).atwho({
      at: '#',
      callbacks: {
        remoteFilter(query, callback) {
          const accessToken = localStorage.accessToken
          if (query) {
            $.ajax({
              url: `https://api.uniyo.io/v1/hashtags/search?query=${query}&access_token=${accessToken}`,
              type: 'GET',
              dataType: 'json',
              success(hashtags) {
              // pull image
                const mappedData = hashtags.map(hashtag => ({
                  hashtag,
                }))

                callback(mappedData)
              },
              error() {
                console.warn('Search is not working')
              },
            })
          }
        },
      },
      displayTpl: "<li style='display: flex; align-items: center; font-family: Roboto; padding: 5px 10px;'>${hashtag}</li>",
      insertTpl: "<span onClick='void 0' data-hashtag='true'>#${hashtag}</span>",
      searchKey: 'hashtag',
    })
  }

  onPaste(event) {
    event.preventDefault()
    const content = (event.originalEvent || event).clipboardData.getData('text/plain')
    document.execCommand('insertText', false, content)
  }

  render() {
    const { postId, className, commentCreate, currentUser, userPost } = this.props
    const classNames = `${input} ${className}`
    return (
      <span className={wrapper}>
        <span className={inputBoxImg}>
          <img src={`${currentUser.image.smallUrl}`} alt="" />
        </span>
        <div
          ref={ref => this._inputComment = ref}
          contentEditable
          onPaste={onPaste}
          placeholder={userPost.firstName}
          className={input}
          type="text"
          ref={ref => this._inputComment = ref}
          contentEditable
          onKeyDown={::this.onKeyDownHandler}
        />
      </span>
    )
  }
}
