import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rx'
import reactStringReplace from 'react-string-replace'

import {
  TextPost,
  TextMention,
} from '../../'

import {
  inputPostWrapper,
  inputPostWrapperImageBox,
  input,
  inputMirror,
  inputWrapper,
  icon,
} from './style'

const setCaretPosition = (textArea, caretPosition) => {
  var range = textArea.createTextRange()
}

export default class InputPost extends Component {

  constructor() {
    super()
    this.state = {
      // plain is visualized data
      plain: '',

      // html is contained DOM
      html: '',

      // source is with encoded data.
      source: '',

      mention: [],
      hashtags: [],
      isOpenSuggestion: false,
    }
  }

  onSelectSuggestionedUser(user) {
    const { id, name } = user
    const userEncode = '<@${id}|${user}>'
    const source = this.state.source + ` ${userEncode}`
    const html = this.state.html + <h1>kei</h1>

    this.setState({
      plain: '',
      html: html,
      source: source
    })
  }

  onTextChangeHandler(event) {
    // parse text and encode everything
    // render encoded text
    event.preventDefault()

    let content = event.target.value
    let html = this.state.html || content
    let source = this.state.source

    // if (event.nativeEvent.keyCode === 13) {
    //   if (event.nativeEvent.shiftKey) {
    //     html.push((<br />))
    //   }
    // } else
    console.log(event.key === 'Enter')
    if (event.key === ' ') {
      content = reactStringReplace(content, /\s+/g, '&nbsp')
    }

    if (event.key === 'Enter') {
      console.log('Enter inside block')

      if (this.props.currentPostType === 'REVIEW') {
        this.props.onPostSubmit({
          postType: this.props.currentPostType === 'ALL' ? 'POST' : this.props.currentPostType,
          text: 'hi',
          rating: 5,
        })
      }

      if (this.props.currentPostType === 'QUESTION') {
        this.props.onPostSubmit({
          postType: this.props.currentPostType === 'ALL' ? 'POST' : this.props.currentPostType,
          text: 'question',
        })
      }

      if (this.props.currentPostType === 'CLASS_NOTE') {
        this.props.onPostSubmit({
          postType: this.props.currentPostType === 'ALL' ? 'POST' : this.props.currentPostType,
          text: 'documents',
        })
      }
    }

    content = reactStringReplace(content, /#([ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿa-zA-Z0-9-]+)/g, (tag, i) => {
      return (
        <span style={{color: 'red'}}>#{tag}</span>
      )
    })


    content = reactStringReplace(content, /@([ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿa-zA-Z0-9-]+)/g, (tag, i) => {
      return (
        <span style={{color: 'blue'}}>@{tag}</span>
      )
    })

    this.setState({
      html: content,
    })

  }

  render() {
    // mention
    // hashtag
    const { imgUrl, hashtag } = this.props
    return (
      <span className={inputPostWrapper}>
        <span className={inputPostWrapperImageBox}>
          <img src={imgUrl ? imgUrl : 'loading'} />
        </span>
        <div className={inputWrapper}>
          {this.state.html}
          <textarea
            ref={(ref) => { this._mirror = ref }}
            onKeyUp={event => ::this.onTextChangeHandler(event)}
            className={input}
          />
        </div>
        {this.state.isOpenSuggestion && this.props.suggestionedUser.map(user => {
          <li>{user}</li>
        })}

      </span>
    )
  }
}
