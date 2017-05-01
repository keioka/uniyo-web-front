import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rx'
import reactStringReplace from 'react-string-replace'
import StarRatingComponent from 'react-star-rating-component'
import Dropzone from 'react-dropzone'

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
  boxOptional,
  imageUser,
  suggestion,
  suggestionItem,
  icon,
  mention,
  dropZone,
} from './style'

// WYSIWYG

// The mapping between DOM content and Visible content should be well-behaved.
// The mapping between DOM selection and Visible selection should be well-behaved.
// All visible edits should map onto an algebraically closed and complete set of visible content.

// Create a model of the document, with a simple way to tell if two models are visually equivalent
// Create a mapping between the DOM and our model
// Define well-behaved edit operations on this model
// Translating all key presses and mouse clicks into sequence of these operations


/* - requirement
- selection
- delete
- p for change line
- prepare p first
- when user changed line add <p> and append text inside new <p>
- user might change postion of mention
*/


// There is two model.
// taransparent textarea and add Dom to parent wrapper
// contenteditable

/* paragraph

[{text: ''}]

*/

/*
  User
    - User name is not unique and id is.
    - Add text
    - Add hashtags
    - Add mention
    - Add new line
    - Delete line
*/


// content -> user input
// Hello I am kei. @user1 kei is here. @user1 Hello

// source -> encoded
// Hello I am kei. <@id12|user1> kei is here. <@id143232|user1> Hello

// markup
// <p>Hello I am kei. <span>@user1</span> <span>@user1</span> </p>

const createMentionDom = (user) => {
  const { id, name, image } = user
  const username = document.createElement('span')
  username.setAttribute('class', mention)
  username.setAttribute('data-user-id', id)
  username.setAttribute('data-mention', 'true')

  /*const img = document.createElement('img')
  img.setAttribute('src', image)
  img.setAttribute('class', imageUser)
  rootDom.appendChild(img)
  */
  username.innerHTML = `@${name.split(" ")[0]} `

  return username
}


/* parseMention
  @param {string}
*/

function replaceSelectedText(dom, replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection()
        if (sel.rangeCount) {
            range = sel.getRangeAt(0)
            range.deleteContents()
            range.insertNode(document.createTextNode(replacementText))
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange()
        range.text = replacementText
    }
}


function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0
    var doc = element.ownerDocument || element.document
    var win = doc.defaultView || doc.parentWindow
    var sel
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection()
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0)
            var preCaretRange = range.cloneRange()
            preCaretRange.selectNodeContents(element)
            preCaretRange.setEnd(range.endContainer, range.endOffset)
            caretOffset = preCaretRange.toString().length
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange()
        var preCaretTextRange = doc.body.createTextRange()
        preCaretTextRange.moveToElementText(element)
        preCaretTextRange.setEndPoint("EndToEnd", textRange)
        caretOffset = preCaretTextRange.text.length
    }
    return caretOffset
}

const parseMention = (textarea) => {
  const mentions = textarea.querySelectorAll('span[data-mention]')
  const userIds = Array.from(mentions).map(mention => mention.getAttribute('data-user-id'))
  return userIds
}


// TODO: regex and put it there
// [ john, john, tom ]
//
const charactersOnly = /^[a-zA-Z]$/

export default class InputPost extends Component {

  constructor() {
    super()
    this.state = {
      // mention parser
      mentionParser: {
        isSearching: false,
        query: '',
        start: -1,
        end: -1,
      },

      postionSuggestionCurrent: -1,

      mentions: [],
      dataMentions: [],
      hashtags: [],
      cutMentions: [],
      // later feature
      isOpenSuggestion: false,
    }
  }


  onSelectSuggestionedUser(user) {
    const elem = createMentionDom(user)
    const { start, end } = this.state.mentionParser
    const plainTextUserName = this._input.textContent.slice(start + 1, end)
    this._input.innerHTML = this._input.innerHTML.replace('@' + plainTextUserName, '')
    this._input.appendChild(elem)

    const emptySpan = document.createElement('span')
    emptySpan.innerHTML = ' '

    this._input.appendChild(emptySpan)

    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    range.setStartAfter(emptySpan)
    range.setEndAfter(emptySpan)
    selection.removeAllRanges()
    selection.addRange(range)

    this.setState({
      dataMentions: [...this.state.mentions, {
        userId: user.id,
        userName: user.name,
        start: this.state.mentionParser.start,
        end: this.state.mentionParser.end,
      }],
      optional: {
        rating: -1,
        file: {},
      },
      postionSuggestionCurrent: -1,
      isOpenSuggestion: false,
      mentionParser: {
        isSearching: false,
        query: '',
        start: -1,
        end: -1,
      }
    })
  }

  onSubmitHandler(content) {
    const { currentPostType } = this.props
    if (currentPostType === 'REVIEW') {
      this.props.onPostSubmit({
        postType: currentPostType === 'ALL' ? 'POST' : currentPostType,
        text: content,
        rating: 5,
      })
    }

    if (currentPostType === 'QUESTION') {
      this.props.onPostSubmit({
        postType: currentPostType === 'ALL' ? 'POST' : currentPostType,
        text: content,
      })
    }

    if (currentPostType === 'CLASS_NOTE') {
      this.props.onPostSubmit({
        postType: currentPostType === 'ALL' ? 'POST' : currentPostType,
        text: content,
      })
    }
  }

  onPasteHandler(event) {
    event.preventDefault()
    // compare before and after
    const text = (event.originalEvent || event).clipboardData.getData('text/html')
    window.document.execCommand('insertHTML', false, text)
  }

  onTextCopy(event) {
    const text = (event.originalEvent || event).clipboardData.getData('text/html')
  }

  onTextCut(event) {
    const text = (event.originalEvent || event).clipboardData.getData('text/html')
  }

  onDeleteHandler(event) {
    const userInput = event.key
    const caretPosition = getCaretCharacterOffsetWithin(this._input) - 1
    const deletedChar = this._input.textContent.charAt(caretPosition)

    if (userInput === 'Backspace' && deletedChar === '@') {
      this.setState({
        isOpenSuggestion: false,
      })
    }
  }

  onTextChangeHandler(event) {
    event.preventDefault()

    if (this.state.isOpenSuggestion) {

      const { postionSuggestionCurrent } = this.state
      const { suggestionedUsers } = this.props

      if (event.key === 'ArrowDown') {
        this.setState({
          postionSuggestionCurrent: postionSuggestionCurrent < suggestionedUsers.length - 1 ? postionSuggestionCurrent + 1 : postionSuggestionCurrent,
        })
      }

      if (event.key === 'ArrowUp') {
        this.setState({
          postionSuggestionCurrent: postionSuggestionCurrent > -1 ? postionSuggestionCurrent - 1 : postionSuggestionCurrent,
        })
      }

      if (event.key === 'Enter') {
        const user = suggestionedUsers[postionSuggestionCurrent]
        this.onSelectSuggestionedUser(user)
      }
    }

    const userInput = event.key
    const { mentionParser } = this.state
    const input = this._input
    input.focus()

    // Get the caret position when @ is started.
    const caretPosition = getCaretCharacterOffsetWithin(input) - 1

    // event search is true and key is alphabet
    if (mentionParser.isSearching && charactersOnly.test(userInput)) {
      this.setState({
        mentionParser: {
          ...mentionParser,
          end: mentionParser.end + 1,
        }
      }, () => {
        const { start, end } = this.state.mentionParser
        const userName = this._input.textContent.slice(start + 1, end)
        if (userName) {
          this.props.userSearch({ query: userName })
        }
      })
    }

    if (userInput === 'Backspace') {
      const currentMatchedMention = this._input.textContent.match(/\@[a-z]*/g)
      const deletedMentions = this.state.mentions.filter(mention => mention.end !== caretPosition)

      this.setState({
        mentions: deletedMentions,
        matchedMention : currentMatchedMention,
        mentionParser: {
          ...mentionParser,
          end: mentionParser.end - 1,
        }
      }, () => {
        const { start, end } = this.state.mentionParser
        const userName = this._input.textContent.slice(start + 1, end)
        if (userName) {
          this.props.userSearch({ query: userName })
        }
      })
    }

    // if user type space during search mode,
    if (userInput === ' ' && mentionParser.isSearching) {
      this.setState({
        mentionParser: {
          ...mentionParser,
          start: -1,
          end: -1,
          isSearching: false,
          isOpenSuggestion: false,
        }
      })
    }

    // avoid email
    // if it contains @ and the letter before @ is empty or @ is first letter.
    const regexSpace = /\s/g
    if (
      userInput === '@' &
      (
        caretPosition === 0 ||
        regexSpace.test(this._input.textContent.charAt(caretPosition - 1))
      )
    ) {

      const input = this._input
      input.focus()

      this.setState({
        isOpenSuggestion: true,
        mentionParser: {
          ...this.state.mentionParser,
          isSearching: true,
          start: caretPosition,
          end: caretPosition + 1,
        },
      })
    }

    if (userInput === 'Enter') {

      this.onSubmitHandler()
    }
  }

  render() {
    let BoxOptional
    const { currentPostType } = this.props
    if (currentPostType === 'REVIEW') {
      BoxOptional = (
        <StarRatingComponent
          name={'Review'} /* name of the radio input, it is required */
          value={5} /* number of selected icon (`0` - none, `1` - first) */
          starCount={5} /* number of icons in rating, default `5` */
          starColor={'#FFDD00'} /* color of selected icons, default `#ffb400` */
          emptyStarColor={'gray'} /* color of non-selected icons, default `#333` */
          editing
       />)
    }

    if (currentPostType === 'QUESTION') {

    }

    if (currentPostType === 'CLASS_NOTE') {
      BoxOptional = (
        <Dropzone
          // onDrop={}
          className={dropZone}
          multiple={false}
        >
          <div >
            <h4>Drop the file or click here to find on your computer</h4>
          </div>
        </Dropzone>
      )
    }

    const { imgUrl, hashtag } = this.props
    return (
      <span className={inputPostWrapper}>
        <span className={inputPostWrapperImageBox}>
          <img src={imgUrl || 'loading'} />
        </span>
        {BoxOptional ? <span className={boxOptional}>{BoxOptional}</span> : null}
        <div className={inputWrapper}>
          <div
            id="post-editor"
            contentEditable
            className={input}
            onPaste={::this.onPasteHandler}
            onKeyDown={::this.onDeleteHandler}
            onKeyUp={::this.onTextChangeHandler}
            onCopy={::this.onTextCopy}
            onCut={::this.onTextCut}
            ref={input => { this._input = input }}
          />
        </div>
        {this.state.isOpenSuggestion &&
          <ul className={suggestion}>
          {this.props.suggestionedUsers.map((user, index) =>
            <li
              key={user.id}
              data-select={ index === this.state.postionSuggestionCurrent}
              className={suggestionItem}
              onClick={() => ::this.onSelectSuggestionedUser(user)}
            >
              {user.name}
            </li>)
          }
          </ul>
        }
      </span>
    )
  }
}
