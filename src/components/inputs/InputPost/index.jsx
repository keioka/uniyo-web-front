import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import StarRatingComponent from 'react-star-rating-component'
import Dropzone from 'react-dropzone'
import { fromJS } from 'immutable'

import { EditorState, CompositeDecorator, convertFromRaw, convertToRaw, stateToHTML } from 'draft-js'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import createMentionPlugin from 'draft-js-mention-plugin'
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import 'style-loader!css-loader!draft-js-mention-plugin/lib/plugin.css'

const MENTION_REGEX = /<@(.*?)>/g
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g

const mentionStrategy = (contentBlock, callback, contentState) => findWithRegex(contentBlock, callback, contentState, MENTION_REGEX)
const hashtagStrategy = (contentBlock, callback, contentState) => findWithRegex(contentBlock, callback, contentState, HASHTAG_REGEX)

function findWithRegex(contentBlock, callback, contentState, regex) {
  const text = contentBlock.getText()
  let matchArr, start
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index
    callback(start, start + matchArr[0].length)
  }
}

const MentionSpan = (props) => {
  return (
    <span data-kei='hi'>
      {props.children}
    </span>
  )
}

const HashtagSpan = (props) => {
  return (
    <span
      style={styles.hashtag}
      data-offset-key={props.entityKey}
    >
      {props.children}
    </span>
  )
}

const mentionPlugin = createMentionPlugin({
  mentionComponent: (props) => {
    return (
      <span
        data-offset-key={props.entityKey}
        data-user-id={props.mention.get('id')}
      >
        @{props.decoratedText}
      </span>
    )
  },
})

const { MentionSuggestions } = mentionPlugin
const compositeDecorator = new CompositeDecorator([
  {
    strategy: mentionStrategy,
    component: MentionSpan,
  }, {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
])

const plugins = [ mentionPlugin ]

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
    editorState: EditorState.createEmpty(compositeDecorator),
    postionSuggestionCurrent: -1,
    suggestions: fromJS([]),
    // later feature
    isOpenSuggestion: false,
    form: {
      rating: 5,
      file: null,
    },
  }

  componentWillReceiveProps() {
    this.setState({
      suggestions: fromJS(this.props.suggestionedUsers),
    })
  }

  keyBindingFn(event) {
    if (event.keyCode === 13) {
      if (event.nativeEvent.shiftKey) {
        console.log(event)
      } else {
        event.preventDefault()
        this.onSubmit()
        return
      }
    }
    return getDefaultKeyBinding(event)
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

  onSearchChange({ value }) {
    if (value) {
      this.props.userSearch({ query: value })
    }
  }

  onSubmit() {
    const { currentPostType } = this.props
    const plainText = this.state.editorState.getCurrentContent().getPlainText()

    if (currentPostType === 'ALL') {
      this.props.onPostSubmit({
        postType: 'POST',
        text: plainText,
      })
    }

    if (currentPostType === 'REVIEW') {
      this.props.onPostSubmit({
        postType: currentPostType,
        text: plainText,
        rating: this.state.form.rating,
      })
    }

    if (currentPostType === 'QUESTION') {
      this.props.onPostSubmit({
        postType: currentPostType,
        text: plainText,
      })
    }

    if (currentPostType === 'CLASS_NOTE') {
      if (!this.state.form.file) {
        // if file is not uploaded.
      }

      this.props.onPostSubmit({
        postType: currentPostType,
        text: plainText,
        classNote: this.state.form.file,
      })
    }
  }

  onFocus() {
    this.editor.focus()
  }

  onAddMention(event) {
    // https://github.com/draft-js-plugins/draft-js-plugins/pull/706
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
        <div className={inputWrapper} onClick={::this.onFocus}>
          <Editor
            editorState={this.state.editorState}
            ref={editor => this.editor = editor}
            onChange={::this.onChange}
            keyBindingFn={::this.keyBindingFn}
            plugins={plugins}
          />
          <MentionSuggestions
            onSearchChange={::this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={::this.onAddMention}
            entryComponent={ListMentionSuggestion}
          />
        </div>
      </span>
    )
  }
}
