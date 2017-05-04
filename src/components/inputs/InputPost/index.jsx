import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
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
  filename,
} from './style'

// Since the decorators are stored in the EditorState it's important to not reset the complete EditorState.
// The proper way is to reset the ContentState which is part of the EditorState. In addition this ensures proper undo/redo behavior.
//https://github.com/draft-js-plugins/draft-js-plugins/blob/master/FAQ.md

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

  componentDidMount() {
    // $inputor.atwho('load', '@', [{name: 'one'}, {nick: 'two'}]);

    const self = this
    // TODO: Move this or connect to redux
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

  onKeyUp(event) {
    console.log($('#input').atwho('isSelecting'))
    if (event.keyCode === 13) {
      if (event.shiftKey) {
        console.log('shift key')
      } else if ($('#input').atwho('isSelecting') === false) {
        console.log($('#input').atwho('isSelecting'))
        this.onSubmit()
      }
    }
  }

  onSubmit() {
    const { currentPostType } = this.props
    const text = postTranspiler(this._input)

    if (currentPostType === 'ALL') {
      this.props.onPostSubmit({
        postType: 'POST',
        text: text,
      })
    }

    if (currentPostType === 'REVIEW') {
      this.props.onPostSubmit({
        postType: currentPostType,
        text: text,
        rating: this.state.form.rating,
      })
    }

    if (currentPostType === 'QUESTION') {
      this.props.onPostSubmit({
        postType: currentPostType,
        text: text,
      })
    }

    if (currentPostType === 'CLASS_NOTE') {
      if (!this.state.form.file) {
        // if file is not uploaded.
      }

      this.props.onPostSubmit({
        postType: currentPostType,
        text: text,
        classNote: this.state.form.file,
      })
    }
  }

  onStarClick(nextValue) {
    this.setState({
      form: {
        rating: nextValue,
      },
    })
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
            <div>
              <h4>Drop the file or click here to find on your computer</h4>
            </div> :
            <div>
              <h4 className={filename}>{this.state.form.file.name}</h4>
              <h4>{`${(this.state.form.file.size / 1024 / 1024).toFixed(3)}MB`}</h4>
              <h4>X</h4>
            </div>
          }
        </Dropzone>
      )
    }

    return BoxOptional
  }

  render() {
    const { imgUrl, hashtag } = this.props
    return (
      <span className={inputPostWrapper}>
        <span className={inputPostWrapperImageBox}>
          <img src={imgUrl || 'loading'} />
        </span>
        {this.BoxOptional ? <span className={boxOptional}>{this.BoxOptional}</span> : null}
        <div className={inputWrapper}>
           <div
             id='input'
             ref={input => { this._input = input }}
             className={input}
             contentEditable={true}
             onCopy={::this.onCopy}
             onKeyUp={::this.onKeyUp}
             onPaste={::this.onPaste}
           ></div>
        </div>
      </span>
    )
  }
}
