import React, { Component, PropTypes } from 'react'

import {
  input,
  inputBoxImg,
  wrapper,
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
    if (event.key === 'Enter'){
      commentCreate({ postId , text: text})
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
              success: function(data) {
                console.log(data)
                callback(data)
              },
              error: function() {
                console.log('Search is not working')
              }
            })
          }
        }
      },
      displayTpl: "<li><img src='${image.small_url}'/> ${name}</li>",
      insertTpl: "<span onClick='return;' data-user-id=${id}>@${name}</span>",
      searchKey: 'name'
    })
  }
  render() {
    const { postId, className, commentCreate, currentUser } = this.props
    const classNames = `${input} ${className}`

    return (
      <span className={wrapper}>
        <span className={inputBoxImg}><img src={`${currentUser.image.smallUrl}`} alt=""/></span>
        <span
          ref={ref => this._inputComment = ref }
          contentEditable={true}
          className={input}
          data-user-image={"https://uniyo.s3.amazonaws.com/users/profile/small/541_f53b1f4364a4415ebdbda4dd0af1ca51.jpg"}
          onKeyDown={::this.onKeyDownHandler}
          type="text"
        />
      </span>
    )
  }
}
