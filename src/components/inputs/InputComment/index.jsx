import React, { Component, PropTypes } from 'react'

import {
  inputText
} from './style'

export default class InputComment extends Component {

  onKeyDownHandler = (event) => {
    if (event.key === 'Enter'){
      commentCreate({ postId , text: event.target.value })
    }
  }

  componentDidMount() {
    $('#input').atwho({
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
    const { postId, className, commentCreate } = this.props
    const classNames = `${inputText} ${className}`

    return (
      <span>
        <div
          contentEditable={true}
          className={inputText}
          data-user-image={"https://uniyo.s3.amazonaws.com/users/profile/small/541_f53b1f4364a4415ebdbda4dd0af1ca51.jpg"}
          onKeyDown={::this.onKeyDownHandler}
          type="text"
        />
      </span>
    )
  }
}
