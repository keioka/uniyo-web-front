import React, { Component, PropTypes } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import Dropzone from 'react-dropzone'
import localStorage from '../../../utils/localStorageHandler'
import postTranspiler from '../../../utils/postTranspiler'

import $ from 'jquery'
import 'jquery.caret'
import 'style-loader!css-loader!at.js/dist/css/jquery.atwho.css'
import 'at.js'

import {
  TextPost,
  TextMention,
  ListMentionSuggestion,
} from '../../'

import {
  wrapper,
  wrapperImageBox,
  input,
  inputWrapper,
  boxOptional,
  dropZone,
  dropZoneBox,
  dropZoneFilename,
  btnFileDelete,
} from './style'

function placeCaretAtEnd(el) {
    el.focus()
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        var sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
    }
}

export default class InputPost extends Component {

  static propTypes = {
    onPostSubmit: PropTypes.func.isRequired,
  }

  state = {
    postionSuggestionCurrent: -1,
    // later feature
    isOpenSuggestion: false,
    form: {
      rating: 5,
      file: null,
    },
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.suggestionedUsers !== this.props.suggestionedUsers ||
      nextProps.hashtag !== this.props.hashtag ||
      nextProps.placeholder !== this.props.placeholder ||
      nextProps.currentPostType !== this.props.currentPostType ||
      nextProps.currentHashTag !== this.props.currentHashTag ||
      nextProps.imgUrl !== this.props.imgUrl ||
      nextState !== this.state
    ) {
      return true
    }

    return false
  }

  componentDidMount() {
    const { hashtag } = this.props
    const self = this
    // TODO: Move this or connect to redux
    if (!this.props.suggestionedUsers) {
      $('#input').atwho({
        at: '@',
        callbacks: {
          remoteFilter(query, callback) {
            const accessToken = localStorage.accessToken
            if (query) {
              $.ajax({
                url: `https://api.uniyo.io/v1/users/search?query=${query}&access_token=${accessToken}`,
                type: 'GET',
                dataType: 'json',
                success(users) {
                // pull image
                  const mappedData = users.map(user => ({
                    id: user.id,
                    name: user.name,
                    image: user.image.small_url,
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
        displayTpl: "<li style='display: flex; align-items: center; font-family: Roboto; padding: 5px 10px;'><img style='width: 40px; height: 40px; border-radius: 50%; margin-right: 15px;' src='${image}' /> ${name}</li>",
        insertTpl: "<span onClick='void 0' data-user-id=${id}>@${name}</span>",
        searchKey: 'name',
      })

      $('#input').on("inserted.atwho", function(event, flag, query) {
        event.stopImmediatePropagation()
        event.preventDefault()
      })
    }
  }

  componentWillReceiveProps() {
    const { hashtag } = this.props
    const self = this

    if (
      this.props.suggestionedUsers &&
      this.props.suggestionedUsers.length > 0
    ) {
      const users = this.props.suggestionedUsers

      const mappedData = users.map(user => ({
        id: user.id,
        name: user.name,
        image: user.image.smallUrl,
      }))

      $('#input').atwho({
        at: '@',
        data: mappedData,
        displayTpl: "<li style='display: flex; align-items: center; font-family: Roboto; padding: 5px 15px;'><img style='width: 40px; height: 40px; border-radius: 50%; margin-right: 15px;' src='${image}' /> ${name}</li>",
        insertTpl: "<span onClick='void 0' data-user-id=${id}>@${name}</span>",
        searchKey: 'name',
      })

      const self = this

      $('#input').on("inserted.atwho", function(event, flag, query) {
        event.preventDefault()
        event.stopPropagation()
        return false
      })
    }
  }


  onChange(editorState) {
    this.setState({
      editorState,
    })
  }

  onDropFile(event) {
    const file = event[0]
    this.setState({
      form: {
        file,
      },
    })
  }

  onCopy(event) {
  }

  onPaste(event) {
  }

  onFocus() {
    const { currentHashTag } = this.props
    this._input.innerHTML === '' && currentHashTag ? this._input.innerHTML = `#${currentHashTag} ` : ''
    placeCaretAtEnd(this._input)
  }

  onKeyDown(event) {
    if (event.keyCode === 13 && !event.isDefaultPrevented()) {
      if (!event.shiftKey) {
        event.preventDefault()
        this.onSubmit()
      }
    }
    window.scrollTo(0, window.scrollY)
  }

  onSubmit() {
    const { currentPostType, currentHashTag } = this.props
    const text = postTranspiler(this._input)

    switch (currentPostType) {
      case 'ALL': {
        this.props.onPostSubmit({
          postType: 'POST',
          text,
        })
        break
      }

      case 'REVIEW': {
        this.props.onPostSubmit({
          postType: currentPostType,
          text,
          rating: this.state.form.rating,
        })
        break
      }

      case 'QUESTION': {
        this.props.onPostSubmit({
          postType: currentPostType,
          text,
        })
        break
      }

      case 'CLASS_NOTE': {
        this.props.onPostSubmit({
          postType: currentPostType,
          text,
          classNote: this.state.form.file,
        })
        break
      }

      case 'ANSWER': {
        const { questionId } = this.props
        this.props.onPostSubmit({
          text,
          questionId,
        })
        break
      }

      case 'MESSAGE': {
        const { channelId } = this.props
        this.props.onPostSubmit({
          text,
          channelId,
        })
        break
      }

      default: {
        console.warn('InputPost does not have correct post type')
      }
    }

    this.setState({
      form: {
        rating: 5,
        file: null,
      }
    })


    this._input.innerHTML = currentHashTag ? `#${currentHashTag} ` : ''
    this._input.blur()
  }

  onStarClick(nextValue) {
    this.setState({
      form: {
        rating: nextValue,
      },
    })
  }

  get placeholder() {
    const { currentPostType, currentHashTag } = this.props
    let placeholder

    switch (currentPostType) {
      case 'ALL': {
        placeholder = currentHashTag ? `#${currentHashTag} Feed the news with hashtags` : '#Yo Feed the news with hasthags…'
        break
      }

      case 'REVIEW': {
        placeholder = currentHashTag ? `#${currentHashTag} is the best class ever!` : '#CLASS001 is the best class ever!'
        break
      }

      case 'QUESTION': {
        placeholder = currentHashTag ? `#${currentHashTag} Can we use a calculator during the exam?` : '#CLASS001 Can we use a calculator during the exam?'
        break
      }

      case 'CLASS_NOTE': {
        placeholder = currentHashTag ? `#${currentHashTag} This is a nice summary of chapter 4` : '#CLASS001 This is a nice summary of chapter 4'
        break
      }

      default: {
        placeholder = 'Hi'
      }
    }
    return placeholder
  }

  get BoxOptional() {
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
          onStarClick={::this.onStarClick}
          editing
        />)
    }

    if (currentPostType === 'CLASS_NOTE') {
      BoxOptional = (
        <Dropzone
          onDrop={::this.onDropFile}
          className={dropZone}
          multiple={false}
        >
          {!this.state.form.file ?
            <div className={dropZoneBox}>
              <h5>Drop a file to attach or click and browse to find a document.</h5>
            </div> :
            <div className={dropZoneBox}>
              <h4 className={dropZoneFilename}>{this.state.form.file.name}</h4>
              <h4>{`${(this.state.form.file.size / 1024 / 1024).toFixed(3)}MB`}</h4>
              <button className={btnFileDelete} onClick={(event) => {
                event.stopPropagation()
                this.setState({ form: { file: null } })
              }}></button>
            </div>
          }
        </Dropzone>
      )
    }
    return BoxOptional
  }

  render() {
    const { imgUrl, hashtag, currentHashTag } = this.props
    return (
      <span className={wrapper}>
        <span className={wrapperImageBox}>
          <img src={imgUrl || 'loading'} />
        </span>
        {this.BoxOptional ? <span className={boxOptional}>{this.BoxOptional}</span> : null}
        <div className={inputWrapper}>
          <div
            id="input"
            placeholder={this.props.placeholder || this.placeholder}
            ref={(input) => { this._input = input }}
            className={input}
            contentEditable
            onChange={event => event.preventDefault()}
            onFocus={::this.onFocus}
            onCopy={::this.onCopy}
            onKeyDown={::this.onKeyDown}
            onPaste={::this.onPaste}
          />
        </div>
      </span>
    )
  }
}
