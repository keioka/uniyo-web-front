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

  state = {
    isAllowedShowInstruction: true,
    isOpenInstruction: false
  }

  onKeyDownHandler = (event) => {
    const { postId, commentCreate } = this.props
    const text = postTranspiler(this._inputComment)

    if (event.keyCode === 13) {
      if (event.shiftKey) {
        event.preventDefault()
        commentCreate({ postId , text: text})
        this._inputComment.innerHTML = ''
      } else if ($('#input').atwho('isSelecting') === false) {
        console.log($('#input').atwho('isSelecting'))
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
                console.log('Search is not working')
              }
            })
          }
        }
      },
      displayTpl: "<li style='display: flex; align-items: center; font-family: Roboto; padding: 5px 10px;'><img style='width: 40px; height: 40px; border-radius: 50%; margin-right: 15px;' src='${image}' /> ${name}</li>",
      insertTpl: "<span onClick='void 0' data-user-id=${id}>@${name}</span>",
      searchKey: 'name'
    })
  }

  onFocus() {
    this.setState({
      isOpenInstruction: true,
    })
  }

  onBlur() {
    this.setState({
      isOpenInstruction: false,
      isAllowedShowInstruction: false,
    })
  }

  render() {
    const { postId, className, commentCreate, currentUser } = this.props
    const classNames = `${input} ${className}`

    return (
      <span className={wrapper}>
        {this.state.isOpenInstruction &&
         this.state.isAllowedShowInstruction &&
         <span className={instruction} onClick={() => this.setState({ isOpenInstruction: false, isAllowedShowInstruction: false })}>
           <span className={instructionItem}>
             <span className={instructionCommand}>Enter</span>
             <span>Break Line</span>
           </span>
           <span className={instructionItem}>
             <span className={instructionCommand}>Shift + Enter</span>
             <span>Submit</span>
           </span>
           <span className={instructionItem}>
             <span className={instructionCommand}>@</span>
             <span>add user</span>
           </span>
         </span>
        }
        <span className={inputBoxImg}><img src={`${currentUser.image.smallUrl}`} alt=""/></span>
        <div
          ref={ref => this._inputComment = ref }
          contentEditable={true}
          onFocus={::this.onFocus}
          onBlur={::this.onBlur}
          className={input}
          data-user-image={"https://uniyo.s3.amazonaws.com/users/profile/small/541_f53b1f4364a4415ebdbda4dd0af1ca51.jpg"}
          onKeyDown={::this.onKeyDownHandler}
          type="text"
        />
      </span>
    )
  }
}
