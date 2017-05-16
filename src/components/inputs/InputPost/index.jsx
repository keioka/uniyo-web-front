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
  inputPostWrapper,
  inputPostWrapperImageBox,
  input,
  inputWrapper,
  boxOptional,
  dropZone,
  dropZoneBox,
  dropZoneFilename,
  btnFileDelete,
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
    const { hashtag } = this.props
    const self = this
    if (hashtag) {
      this._input.innerHTML = `#${hashtag}`
    }
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
    if (hashtag) {
      this._input.innerHTML = `#${hashtag}`
    }
    
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
    const { currentPostType } = this.props
    const text = postTranspiler(this._input)

    if (currentPostType === 'ALL') {
      this.props.onPostSubmit({
        postType: 'POST',
        text,
      })
    }

    if (currentPostType === 'REVIEW') {
      this.props.onPostSubmit({
        postType: currentPostType,
        text,
        rating: this.state.form.rating,
      })
    }

    if (currentPostType === 'QUESTION') {
      this.props.onPostSubmit({
        postType: currentPostType,
        text,
      })
    }

    if (currentPostType === 'CLASS_NOTE') {
      if (!this.state.form.file) {
        // if file is not uploaded.
      }

      this.props.onPostSubmit({
        postType: currentPostType,
        text,
        classNote: this.state.form.file,
      })
    }

    if (currentPostType === 'ANSWER') {
      const { questionId } = this.props
      this.props.onPostSubmit({
        text,
        questionId,
      })
    }

    if (currentPostType === 'MESSAGE') {
      const { channelId } = this.props
      this.props.onPostSubmit({
        text,
        channelId,
      })
    }

    this._input.innerHTML = ''
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
            <div className={dropZoneBox}>
              <h4>Upload File</h4>
              <h5>Drop the file or click here</h5>
            </div> :
            <div className={dropZoneBox}>
              <h4 className={dropZoneFilename}>{this.state.form.file.name}</h4>
              <h4>{`${(this.state.form.file.size / 1024 / 1024).toFixed(3)}MB`}</h4>
              <button className={btnFileDelete} onClick={(event) => {
                event.stopPropagation();
                this.setState({form: { file: null }})
              }}></button>
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
            id="input"
            ref={(input) => { this._input = input }}
            className={input}
            contentEditable
            onChange={event => event.preventDefault()}
            onCopy={::this.onCopy}
            onKeyDown={::this.onKeyDown}
            onPaste={::this.onPaste}
          />
        </div>
      </span>
    )
  }
}
